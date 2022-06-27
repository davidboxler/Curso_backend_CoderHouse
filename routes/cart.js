const express = require("express");
const { Router } = express;
const Container = require("../container/contenedor");

const containerCart = new Container("cart.json");
const cartRouter = Router();

cartRouter.get("/", (req, res) => {
  res.send(containerCart.getAll());
});

cartRouter.post("/", (req, res) => {
  obj = {...req.body, ...{ products: []}}
  res.send(containerCart.save(req.body));
});

cartRouter.post("/:id/products", (req, res) => {
    const product = req.body
    const cartID = req.params.id
    const cart = containerCart.getByID(cartID)
    cart.products.push(product)

    const newObj = containerCart.editByBody(cart, cartID)

    res.json(newObj)
  });

module.exports = cartRouter;
