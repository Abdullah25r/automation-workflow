import { pool } from "../utils/pool.js";
import { comparePassword } from "../utils/bcryptConfig.js";
export async function loginAdmin(req, res) {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required." });
  }
  try {
    const result = await pool.query(`SELECT * FROM admins WHERE name = $1`, [
      name,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid name or password." });
    }

    const admin = result.rows[0];
    const isMatch = await comparePassword(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid name or password." });
    }

    // Set session
    req.session.isAdmin = true;
    req.session.adminId = admin.id;

    return res.status(200).json({
      message: "Login successful",
      admin: { id: admin.id, name: admin.name },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getDashboardData(req, res) {
  if (req.session.isAdmin) {
    return res.json({ message: "This is protected dashboard data" });
  } else {
    return res.status(401).json({ message: "Unauthorized access" });
  }
}

export async function logoutAdmin(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });

    res.clearCookie("connect.sid");
    res.json({ message: "logged out successfully" });
  });
}
// function get all customers
export async function getAllCustomers(req, res) {
    const client = await pool.connect();

    try {
        // Query to fetch all customer details
        const result = await client.query(`
            SELECT
                customer_id,
                email,
                first_name,
                last_name,
                address,
                city,
                postal_code,
                phone_number,
                payment_method,
                created_at,
                updated_at
            FROM
                customers
            ORDER BY
                created_at DESC; -- Order by most recently created customers first
        `);

        // Format the data if necessary (e.g., parse dates, ensure numbers)
        const customers = result.rows.map(row => ({
            customer_id: row.customer_id,
            email: row.email,
            first_name: row.first_name,
            last_name: row.last_name,
            address: row.address,
            city: row.city,
            postal_code: row.postal_code,
            phone_number: row.phone_number,
            payment_method: row.payment_method,
            created_at: new Date(row.created_at).toLocaleString(), // Format date for display
            updated_at: new Date(row.updated_at).toLocaleString(), // Format date for display
        }));

        res.status(200).json(customers);

    } catch (error) {
        console.error("Error fetching all customers:", error);
        res.status(500).json({ message: "Failed to fetch customers from the database.", error: error.message });
    } finally {
        client.release(); // Always release the client
    }
}