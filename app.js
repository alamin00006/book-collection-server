const express = require("express");
const app = express();
const cors = require("cors");


// middleware
app.use(express.json());
app.use(cors());

// routes
const productRoute = require('./routes/product.route')
const categoryRoute = require('./routes/category.route')

app.use('/api/v1/product-add', productRoute)
app.use('/api/v1/category', categoryRoute)

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;