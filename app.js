const express = require("express");
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const path = require("path");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars setup
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// API routes
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

// Vistas
app.get("/products", async (req, res) => {
  const axios = require("axios");
  const { data } = await axios.get(
    `http://localhost:3000/api/products${req.url.replace("/products", "")}`
  );
  res.render("products", { ...data, cartId: "ID_DEL_CARRITO" }); // Reemplaza por el ID real del carrito
});

app.get("/products/:pid", async (req, res) => {
  const axios = require("axios");
  const { data } = await axios.get(
    `http://localhost:3000/api/products/${req.params.pid}`
  );
  res.render("products", { payload: [data], page: 1, totalPages: 1 });
});

app.get("/carts/:cid", async (req, res) => {
  const axios = require("axios");
  const { data } = await axios.get(
    `http://localhost:3000/api/carts/${req.params.cid}`
  );
  res.render("cart", data);
});

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
