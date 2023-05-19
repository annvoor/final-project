const mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'nuevans';      // Since we made our schema into a model, this should be created

class Database {
  constructor() {
    this._connect()
  }

_connect() {
    mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        // mongoose.connection.db.dropDatabase()
        dbSuccess()
      })
        .catch(err => {
        console.error('Database connection error')
      })
  }
}

function dbSuccess(){
  console.log('Database connection successful')
}

//creates a new database object
//which calls _connect()
module.exports = new Database()
