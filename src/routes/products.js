const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const products = require("../data/products");

// GET /products - Retrieve a list of all products
router.get("/", (req, res) => {
  res.json(products);
});

// GET /products/:id - Retrieve a specific product by its ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((product) => product.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// POST /products - Create a new product
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, description } = req.body;
    const newProduct = {
      id: products.length + 1,
      name,
      price,
      description,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  }
);

// PUT /products/:id - Update an existing product
router.put(
  "/:id",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);
    const { name, price, description } = req.body;
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        name,
        price,
        description,
      };
      res.json(products[productIndex]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  }
);

// DELETE /products/:id - Delete a product
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct[0]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

module.exports = router;
