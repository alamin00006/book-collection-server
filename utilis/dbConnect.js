const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const uri = process.env.DATABASE_LOCAL;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: true,
    maxPoolSize: 10, 
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
    family: 4,
}

const connectWithDB = () => {
    mongoose.connect(uri, options, (err, db) => {
      if (err) console.error(err);
      else console.log("database connection succesfull")
    })
}


module.exports = connectWithDB;