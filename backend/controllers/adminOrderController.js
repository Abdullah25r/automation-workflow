import { pool } from "../utils/pool.js";
import express from "express";

//all orders
export async function getAllOrders(req, res) {
  const client = await pool.connect();
  try {
    const result = await client.query(` SELECT
                o.order_id AS id,
                c.first_name || ' ' || c.last_name AS customer_name,
                c.email AS customer_email,
                o.order_date AS date,
                o.status,
                o.total_amount AS total
            FROM
                orders o
            JOIN
                customers c ON o.customer_id = c.customer_id
            ORDER BY
                o.order_date DESC; -- Order by most recent orders first`);

    const orders = result.rows.map((row) => ({
      id: row.id,
      customerName: row.customer_name,
      customerEmail: row.customer_email,
      date: new Date(row.date).toLocaleString(),
      status: row.status,
      total: parseFloat(row.total),
    }));

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    res.status(500).json({
      message: "Failed to fetch orders from the database.",
      error: error.message,
    });
  } finally {
    client.release(); // Release the client back to the pool
  }
}

//specific order detail with customer name.
export async function getAdminOrderDetail(req, res) {
  const { id } = req.params;
  const orderId = id;

  const client = await pool.connect();

  try {
    const orderResult = await client.query(
      `SELECT
                o.order_id,
                o.order_date,
                o.total_amount,
                o.status,
                o.shipping_address,
                o.payment_method,
                o.payment_status,
                c.customer_id,
                c.email AS customer_email,
                c.first_name AS customer_first_name,
                c.last_name AS customer_last_name,
                c.address AS customer_address,
                c.city AS customer_city,
                c.postal_code AS customer_postal_code,
                c.phone_number AS customer_phone_number
            FROM
                orders o
            JOIN
                customers c ON o.customer_id = c.customer_id
            WHERE
                o.order_id = $1;`,
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: "Order not found." });
    }

    const order = orderResult.rows[0];

    const orderItemsResult = await client.query(
      `SELECT
                oi.order_item_id,
                oi.product_id,
                oi.quantity,
                oi.price,
                p.name AS product_name,
                p.image AS product_image
            FROM
                order_items oi
            JOIN
                products p ON oi.product_id = p.product_id
            WHERE
                oi.order_id = $1;`,
      [orderId]
    );

    const detailedOrder = {
      order_id: order.order_id,
      order_date: new Date(order.order_date).toLocaleString(),
      total_amount: parseFloat(order.total_amount),
      status: order.status,
      shipping_address: order.shipping_address,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      customer: {
        customer_id: order.customer_id,
        email: order.customer_email,
        first_name: order.customer_first_name,
        last_name: order.customer_last_name,
        address: order.customer_address,
        city: order.customer_city,
        postal_code: order.customer_postal_code,
        phone_number: order.customer_phone_number,
      },
      order_items: orderItemsResult.rows.map((item) => ({
        order_item_id: item.order_item_id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: parseFloat(item.price),
        product_name: item.product_name,
        product_image: item.product_image,
      })),
    };
    
    res.status(200).json(detailedOrder);
  } catch (error) {
    console.error(`Error fetching order detail for ${orderId}:`, error);
    res
      .status(500)
      .json({
        message: "Failed to fetch order details.",
        error: error.message,
      });
  } finally {
    client.release(); // Always release the client
  }
}
export async function dispatchOrder(req, res) {
    const { orderId } = req.params; // Get orderId from the URL parameters
    const client = await pool.connect();

    try {
        // Update the order status to 'shipped' or 'dispatched'
        // You can choose the exact status string that fits your workflow.
        // Also update the 'updated_at' timestamp.
        const result = await client.query(
            `UPDATE orders
            SET status = 'shipped', updated_at = CURRENT_TIMESTAMP
            WHERE order_id = $1
            RETURNING order_id, status, updated_at;`, // RETURNING helps confirm the update
            [orderId]
        );

        if (result.rows.length === 0) {
            // If no row was updated, the order with that ID was not found
            return res.status(404).json({ message: "Order not found or already dispatched." });
        }

        res.status(200).json({
            message: `Order ${orderId} successfully dispatched!`,
            order: result.rows[0] 
        });

    } catch (error) {
        console.error(`Error dispatching order ${orderId}:`, error);
        res.status(500).json({ message: "Failed to dispatch order due to a server error.", error: error.message });
    } finally {
        client.release(); 
    }
}
