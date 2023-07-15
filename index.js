const express = require("express");
const app = express();
const productsRouter = require("./src/routes/products");

app.use(express.json());

app.use("/products", productsRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
