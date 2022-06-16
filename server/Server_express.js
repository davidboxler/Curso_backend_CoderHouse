const express = require('express')
const products = require('./routes/productsRouter')

const app = express()

app.set('views', '../views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use('/static', express.static('../public'))
// app.use('/products', products)

const productos = []

app.get('/', (req, res) => {
    res.render('index', { productos })
})

app.post('/products', (req, res) => {
    productos.push(req.body)
    console.log(req.body, 'added to products')

    res.render('products', { productos })
})

const server = app.listen(8080, () => {
    console.log("server listening...")
})
server.on('error', e => {
    console.log('Error on server', e)
})

