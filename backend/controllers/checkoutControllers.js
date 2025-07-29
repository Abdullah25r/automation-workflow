import {pool} from '../utils/pool.js'

export async function getCheckoutInfo(req, res) {
    const client = await pool.connect(); 

    try {
        await client.query('BEGIN'); // Start a transaction

        const { customer, order, order_items } = req.body;

        let customerId;

        // 1. Handle Customer: Check if customer exists, otherwise create
        const existingCustomerResult = await client.query(
            'SELECT customer_id FROM customers WHERE email = $1',
            [customer.email]
        );

        if (existingCustomerResult.rows.length > 0) {
            customerId = existingCustomerResult.rows[0].customer_id;
            console.log(`Existing customer found: ${customerId}`);

            // Update existing customer details
            await client.query(
                `UPDATE customers SET
                    first_name = $1,
                    last_name = $2,
                    address = $3,
                    city = $4,
                    postal_code = $5,
                    phone_number = $6,
                    payment_method = $7,
                    updated_at = CURRENT_TIMESTAMP
                WHERE customer_id = $8`,
                [
                    customer.first_name,
                    customer.last_name,
                    customer.address,
                    customer.city,
                    customer.postal_code,
                    customer.phone_number,
                    customer.payment_method, // Use the payment_method from the customer object
                    customerId
                ]
            );
            console.log(`Customer ${customerId} updated.`);

        } else {
            // Insert new customer
            const newCustomerResult = await client.query(
                `INSERT INTO customers (
                    email, first_name, last_name, address, city, postal_code, phone_number, payment_method
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING customer_id`,
                [
                    customer.email,
                    customer.first_name,
                    customer.last_name,
                    customer.address,
                    customer.city,
                    customer.postal_code,
                    customer.phone_number,
                    customer.payment_method // Use the payment_method from the customer object
                ]
            );
            customerId = newCustomerResult.rows[0].customer_id;
            console.log(`New customer created: ${customerId}`);
        }

        // 2. Create the Order
        const newOrderResult = await client.query(
            `INSERT INTO orders (
                customer_id, total_amount, status, shipping_address, payment_status
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING order_id`,
            [
                customerId,
                order.total_amount,
                order.payment_method, // Assuming 'status' is 'pending' by default in DB, if not, add order.status
                order.shipping_address,
                order.payment_status
            ]
        );
        const orderId = newOrderResult.rows[0].order_id;
        console.log(`New order created: ${orderId}`);

        // 3. Insert Order Items
        for (const item of order_items) {
            await client.query(
                `INSERT INTO order_items (
                    order_id, product_id, quantity, price
                ) VALUES ($1, $2, $3, $4)`,
                [
                    orderId,
                    item.product_id,
                    item.quantity,
                    item.price
                ]
            );
        }
        console.log(`Order items inserted for order: ${orderId}`);

        await client.query('COMMIT'); // Commit the transaction

        // Send a success response back to the frontend
        res.status(201).json({
            message: "Order placed successfully!",
            orderId: orderId,
            customerId: customerId
        });

    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction on error
        console.error("Error processing checkout:", error);
        res.status(500).json({
            message: "Failed to place order due to a server error.",
            error: error.message
        });
    } finally {
        client.release(); // Release the client back to the pool
    }
}