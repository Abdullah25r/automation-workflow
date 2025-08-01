import { pool } from "../utils/pool.js";

// func to get all products from db (already good, includes category name)
export async function getProducts(req, res) {
  try {
    const result = await pool.query(`
      SELECT p.*, categories.name AS category
      FROM products p
      JOIN categories ON p.category_id = categories.category_id
      ORDER BY p.product_id DESC
    `);
      res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

// this will add products to database
export async function addProducts(req, res) {
  // Destructure all expected fields, including the new ones
  const { category, name, price, description, image, color, features, discount_price } = req.body;

  try {
    const categoryResult = await pool.query(
      "SELECT category_id FROM categories WHERE name = $1",
      [category]
    );

    if (categoryResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid category name" });
    }
    const categoryId = categoryResult.rows[0].category_id;

    const insertQuery = `
      INSERT INTO products (
        category_id, name, price, description, image,
        color, features, discount_price  -- New columns added here
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) -- Corresponding new placeholders
      RETURNING *;
    `;
    const result = await pool.query(insertQuery, [
      categoryId,
      name,
      price,
      description,
      image,
      color || null,          // If color is undefined or empty string, insert NULL
      features || null,       // If features is undefined or empty string, insert NULL
      // If discount_price is undefined in req.body, set to NULL. Otherwise, use its value.
      // This allows explicit null or a number to be passed.
      discount_price === undefined ? null : discount_price,
    ]);

    res.status(201).json({
      message: "Product added successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM products where product_id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "product not found in database" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
}

// update a product
export async function updateProduct(req, res) {
  const { id } = req.params;
  // Destructure all expected fields from req.body, including the new ones.
  // Note: For this non-dynamic update, all these fields are expected in the request body.
  const { name, description, price, image, category, color, features, discount_price } = req.body;

  try {
    const categoryResult = await pool.query(
      "SELECT category_id FROM categories WHERE name = $1",
      [category]
    );

    if (categoryResult.rowCount === 0) {
      return res.status(400).json({ error: "Invalid category name" });
    }

    const categoryId = categoryResult.rows[0].category_id;

    const updateQuery = `
      UPDATE products
      SET name = $1,
          description = $2,
          price = $3,
          image = $4,
          category_id = $5,
          color = $6,          -- New column
          features = $7,       -- New column
          discount_price = $8, -- New column
          updated_at = CURRENT_TIMESTAMP
      WHERE product_id = $9    -- product_id for WHERE clause
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, [
      name,
      description,
      price,
      image,
      categoryId,
      color || null,          // If color is undefined or empty string, update to NULL
      features || null,       // If features is undefined or empty string, update to NULL
      // If discount_price is undefined in req.body, update to NULL. Otherwise, use its value.
      discount_price === undefined ? null : discount_price,
      id, // The product_id for the WHERE clause
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Update product error details:", error);
    return res.status(500).json({ error: "Failed to update product" });
  }
}

// function get a specific product details
export async function getSpecificProduct(req, res) {
  const product_id = req.params.id;
  try {
    // Modified to join with categories to get the category name
    const result = await pool.query(
      `SELECT p.*, c.name AS category
       FROM products p
       JOIN categories c ON p.category_id = c.category_id
       WHERE p.product_id = $1`,
      [product_id]
    );
    if (result.rows.length > 0) {
      const specificProduct = result.rows[0];
      res.status(200).json(specificProduct);
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    console.error("Error fetching specific product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}