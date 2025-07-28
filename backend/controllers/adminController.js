import { pool } from "../utils/pool.js";
import { comparePassword } from "../utils/bcryptConfig.js";
export async function loginAdmin(req, res) {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required." });
  }
  try {
    const result = await pool.query(`SELECT * FROM admins WHERE name = $1`, [name]);
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
