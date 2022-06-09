const express = require('express')
const products = require('./routes/productsRouter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('../public'))

app.use('/products', products)

app.get('/', (req, res) => {
    res.send({ message: 'Server runing ok'})
})

const server = app.listen(8080, () => {
    console.log("server listening...")
})
server.on('error', e => {
    console.log('Error on server', e)
})

// const Contenedor = require('./Contenedor')

// const DBfile = 'products.json'
// const contenedor = new Contenedor(DBfile)

    // const data = contenedor.getAll()

// app.get('/productsRandom', (req, res) => {
//     const data = contenedor.getAll()

//     const numero = Math.floor(Math.random() * data.length)
//     const item = data[numero]

//     res.json(item)
// })

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // app.get('/', (req, res) => { res.json(DB) });

// const router = Router();
// router.get("/", (req, res) => { res.json(DB) });
// router.get("/:id", (req, res) => { 
//     const id = req.params.id
//     const articulo = data.find(d => d.id == id)

//     if(articulo)
//     res.json(articulo)
//     else res.send("Producto no encontrado") 
// });
// router.post("/", (req, res) => { DB.push(req.body); res.send("Nuevo objeto insertado") });
// router.put("/:id", (req, res) => { 
//     const id = req.params.id 

//  })
// router.delete("/:id", (req, res) => { 
//     const id = Number(req.params.id)
//     const idx = data.findIndex(d => d.id == id)
//     data.splice(idx, 1)

//     res.send("Se elimino correctamente")
// })

// app.use("/api/mensajes", router);

// const server = app.listen(8080, () => {
//     console.log("server listening...")
// })
// server.on('error', e => {
//     console.log('Error on server', e)
// })
