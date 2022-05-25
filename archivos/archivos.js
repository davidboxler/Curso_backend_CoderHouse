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
            fs.writeFileSync(this.filename, JSON.stringify(this.data))
        }catch (error){
            console.log(error)
        }
    }
    read() {
        try{
            fs.readFileSync(this.filename)
        } catch (error){
            console.log(error)
        }
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
