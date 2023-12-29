// index.js
const cors = require('cors');
const express = require("express");
const app = express();
app.use(cors());
const mongoose = require("mongoose");
const {
  createproduct,
  getAllproduct,
  deleteproduct,
  updateproduct,
  getproductById,
} = require("./operations");
app.use(express.json());

mongoose
  .connect(`mongodb+srv://romaanali:AxAtBN1HhalQmRAQ@cluster0.garqbav.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connection to MongoDB created");
  })
  .catch((err) => {
    console.log("Error Connecting");
    console.log(err);
  });

// Create a new product
app.post("/product", async (req, res) => {
  try {
    const { title, price } = req.body;
    const newproduct = await createproduct(title, price);
    res.json(newproduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all product
app.get("/product", async (req, res) => {
  try {
    const allproduct = await getAllproduct();
    res.json(allproduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a product by ID
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getproductById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product by ID
app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price } = req.body;
    const updatedproduct = await updateproduct(id, title, price);
    res.json(updatedproduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product by ID
app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedproduct = await deleteproduct(id);
    res.json(deletedproduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3006;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
