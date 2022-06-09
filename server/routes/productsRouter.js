const express = require("express");
const { Router } = express;
const Container = require("../Contenedor");

const productos = new Container("productos.txt");

const router = Router();

router.get("/", (req, res) => {
  res.send(productos.data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const item = await productos.getByID(Number(id));
  if (!item) {
    return res
      .send(400)
      .send({ error: `El producto con el id:${id} no existe` });
  }
  res.send(item);
});

router.post("/", async (req, res) => {
  const { title, img, price } = req.body;

  if (!title || !img || !price) {
    return res.send(400).send({ error: "Los datos estan incompletos" });
  }
  await productos.save({ title, img, price });

  return res.send({ message: "Producto cargado exitosamente" });
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { field, value } = req.body;

    productos.editByid(Number(id), field, value);

    res.send({
      message: `El producto con el id: ${id} se modifico exitosamente`,
    });
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const item = productos.deleteById(Number(id));
    if (!item) {
      return res
        .send(400)
        .send({ error: `El producto con el id:${id} no existe` });
    }
    res.send("Se elimino correctamente");
  } catch (error) {
    throw error;
  }
});

module.exports = router;
