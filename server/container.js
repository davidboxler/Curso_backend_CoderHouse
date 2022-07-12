const knex = require("./connection");

class DataBase {
 async saveMsn(obj) {
   await knex("mensajes")
      .insert(obj)
      .then(() => console.log("data inserted"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }

 async saveProduct(obj) {
   await knex("productos")
      .insert(obj)
      .then(() => console.log("data inserted"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }

  getByIDProduct(id) {
    return knex.from('productos').select('*')
      .where('id' == id)
      .then( rows => {
        for (const row of rows) {
          console.log(`${row['id']}: ${row['name']}: ${row['foto']} (${row['price']})}`)
        }
        console.log(rows)
      })
      .catch(err => console.log(err))
      .finally(() => knex.destroy())
  }
  getByIDMsn(id) {
   return knex.from('mensajes').select('*')
      .where('id' == id)
      .then( rows => {
        for (const row of rows) {
          console.log(`${row['id']}: ${row['msn']}: ${row['email']}: ${row['date']}`)
        }
        console.log(rows)
      })
      .catch(err => console.log(err))
      .finally(() => knex.destroy())
  }

async getAllProducts() {
    try{
      const rows1 = await knex.from('productos').select('*')
      console.log(rows1)
      return rows1
    } catch(e) {
      console.log(e)
    } finally {
      knex.destroy()
    }
  }

  async getAllMsn() {
    try{
      const rows = await knex.from('mensajes').select('*')
      console.log(rows)
      return rows
    } catch(e) {
      console.log(e)
    } finally {
      knex.destroy()
    }
  }

  deleteByIdProduct(id) {
    knex.from('productos')
    .where('id' == id)
    .del()

    .then(() => console.log('data deleted'))
    .catch(err => console.log(err))
    .finally(() => knex.destroy())
  }

  deleteByIdMsn(id) {
    knex.from('mensajes')
    .where('id' == id)
    .del()

    .then(() => console.log('data deleted'))
    .catch(err => console.log(err))
    .finally(() => knex.destroy())
  }

  deleteAll() {}
}

module.exports = DataBase;
