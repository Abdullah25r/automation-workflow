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
export async function getLatestProducts(req, res) {
  const limit = 8; // Default to 8
  try {
    const result = await pool.query(
      `SELECT p.*, c.name AS category
       FROM products p
       JOIN categories c ON p.category_id = c.category_id
       ORDER BY p.created_at DESC
       LIMIT $1`,
      [limit]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Get latest products error:", error);
    res.status(500).json({ error: "Failed to fetch latest products" });
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
//helper function
const safeToNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const num = Number(value);
  // Return null if the conversion results in a non-numeric value (NaN)
  return isNaN(num) ? null : num;
};

// The main handler function for updating a product.
export async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, description, image, category } = req.body;
  
  // Extract and safely process the fields that can be null or empty
  const { price, color, features, discount_price } = req.body;

  try {
    // 1. Validate the category exists before proceeding
    const categoryResult = await pool.query(
      "SELECT category_id FROM categories WHERE name = $1",
      [category]
    );

    if (categoryResult.rowCount === 0) {
      return res.status(400).json({ error: "Invalid category name" });
    }

    const categoryId = categoryResult.rows[0].category_id;

    // 2. Safely convert the price fields using our helper function
    const safePrice = safeToNumber(price);
    const safeDiscountPrice = safeToNumber(discount_price);

    // If the price is not a valid number, we return a clear error.
    if (safePrice === null) {
      return res.status(400).json({ error: "Price must be a valid number." });
    }

    // 3. Construct the UPDATE query
    const updateQuery = `
      UPDATE products
      SET name = $1,
          description = $2,
          price = $3,
          image = $4,
          category_id = $5,
          color = $6,
          features = $7,
          discount_price = $8,
          updated_at = CURRENT_TIMESTAMP
      WHERE product_id = $9
      RETURNING *;
    `;

    // 4. Execute the query with the validated and sanitized data
    const result = await pool.query(updateQuery, [
      name,
      description,
      safePrice,            // Use the validated number
      image,
      categoryId,
      color || null,        // Handle empty strings as NULL
      features || null,     // Handle empty strings as NULL
      safeDiscountPrice,    // Use the validated number or NULL
      id,
    ]);

    // 5. Handle cases where the product ID was not found
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 6. Return a success message and the updated product
    return res.status(200).json({
      message: "Product updated successfully",
      product: result.rows[0],
    });
  } catch (error) {
    // Log the full error to the console for detailed debugging
    console.error("Update product error details:", error);
    // Return a generic error to the frontend
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