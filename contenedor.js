const fs = require('fs')

class Contenedor {

    constructor(filename) {
        console.log('Init Contenedor')
        this.filename = filename
        this.data = []

        try {
            this.read()
        } catch(e) {
            console.log('No se encontro el file')
            console.log('Creando uno nuevo')
            this.write()
        }
    }

    write() {
        try{
            fs.writeFile(this.filename, JSON.stringify(this.data), (err, result) => {
                if(err) throw err;
            })
        }catch (error){
            console.log(error)
        }
    }
    read() {
       this.data = JSON.parse(fs.readFileSync(this.filename))
    }

    getLastID() {
        const l = this.data.length
        
        if(l < 1) return 0

        return this.data[this.data.length - 1].id
    }

    save(obj) {
        const id = this.getLastID()
        this.data.push({
            ...obj, ...{ id: id + 1 }
        })
        this.write()
    }

    editByid(id, campo, valor) {
        try{
            let productos = this.getAll()
            let producto = productos.filter(producto => producto.id === id)
            producto[campo] = valor
            const index = productos.findIndex(producto => producto.id === id) 

            productos = productos.splice(index, 1, producto)

            const itemParsed = JSON.stringify(productos)
            fs.promises.writeFile(this.filename, itemParsed)
        } catch(error) {
            console.log(error)
        }
    }

    getByID(id) {
        return this.data.find(p => p.id == id)
    }

    getAll() {
        return this.data
    }

    deleteById(id) {
        const idx = this.data.findIndex(p => p.id == id)
        this.data.splice(idx, 1)
        console.log(this.data)
        this.write()
    }

    deleteAll() {
        this.data = []
        this.write()
    }

}

module.exports = Contenedor

