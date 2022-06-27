const express = require("express");
const { Router } = express;
const Container = require("../container/contenedor");

const containerProducts = new Container("products.json");
const productRouter = Router();

function auth(req, res, next) {
    if('admin' in req.headers) next()
    else {
        res.status(400)
        res.send('No admin')
    }
}

productRouter.get("/", (req, res) => {
  res.send(containerProducts.getAll());
});

productRouter.post("/", auth, (req, res) => {
  res.send(containerProducts.save(req.body));
});

module.exports = productRouter;
