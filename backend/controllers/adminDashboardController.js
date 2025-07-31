import { pool } from "../utils/pool.js";

export async function getDashboardStats(req, res) {
  const client = await pool.connect();
  try {
    // query to get all products
    const totalProductResult = await client.query(
      `SELECT COUNT(*) AS total_products FROM products;`
    );
    const totalProducts = parseInt(
      totalProductResult.rows[0].total_products, // Access using lowercase 'total_products'
      10
    );
    // query to get Total Orders
    const totalOrdersResult = await client.query(
      `SELECT COUNT(*) AS total_orders FROM orders;`
    );
    const totalOrders = parseInt(totalOrdersResult.rows[0].total_orders, 10);
    // query to count total customers
    const totalCustomersResult = await client.query(
      `SELECT COUNT(*) AS total_customers FROM customers;`
    );
    const totalCustomers = parseInt(
      totalCustomersResult.rows[0].total_customers,
      10
    );
    //query to get total revenue (sum)
    const totalRevenueResult = await client.query(`
            SELECT COALESCE(SUM(total_amount), 0) AS total_revenue
            FROM orders;
        `);
    const totalRevenue = parseFloat(totalRevenueResult.rows[0].total_revenue);
    const dashboardStats = {
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue: totalRevenue.toFixed(2),
    };
    res.status(200).json(dashboardStats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      message: "Failed to fetch dashboard statistics.",
      error: error.message,
    });
  } finally {
    client.release(); // Always release the client
  }
}
