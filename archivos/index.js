const Contenedor = require('./archivos')

const container = new Contenedor('products.json')

container.save({
    title: 'Espada World of Warcraft',
    img: 'https://http2.mlstatic.com/D_NQ_NP_775996-MLA48871687662_012022-O.webp',
    price: 10000
})
container.save({
    title: 'Espada Shalamayne',
    img: 'https://http2.mlstatic.com/D_NQ_NP_631672-MLA48871890785_012022-O.webp',
    price: 25423
})
container.save({
    title: 'Espada Warglaive Guja',
    img: 'https://http2.mlstatic.com/D_NQ_NP_845345-MLA48871816465_012022-O.webp',
    price: 30321
})
container.save({
    title: 'Espada Anduin Lothar Quel',
    img: 'https://http2.mlstatic.com/D_NQ_NP_775191-MLA48871664353_012022-O.webp',
    price: 44553
})

console.log(container.getByID(1))
console.log(container.getAll())
container.deleteById(2)
// container.deleteAll()
