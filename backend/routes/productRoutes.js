import express from "express";
const router = express.Router();

const products = [];

router.post("/", async (req, res) => {
  const { name, description, price, image, category } = req.body;

  if (!name || !price || !category || !image) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newProduct = {
    id: products.length + 1,
    name,
    description,
    price,
    image,
    category,
  };
  products.push(newProduct);

  console.log("New Product:", newProduct);

  return res.status(200).json({ message: "Product added", product: newProduct });
});
// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
        console.log(id,updatedData)
    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
   console.log("product deleted successfully"+id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
