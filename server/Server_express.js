const express = require('express')
const Contenedor = require('./Contenedor')

const DBfile = 'products.json'
const app = express()
const contenedor = new Contenedor(DBfile)


app.get('/products', (req, res) => {
    const data = contenedor.getAll()

    res.json(data)
})

app.get('/productsRandom', (req, res) => {
    const data = contenedor.getAll()

    const numero = Math.floor(Math.random() * data.length)
    const item = data[numero]

    res.json(item)
})

app.listen(8080)