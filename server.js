const express = require("express");
const cartRouter = require("./routes/cart");
const productRouter = require("./routes/products");

const app = express();

app.use("/static", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.listen(8080);
