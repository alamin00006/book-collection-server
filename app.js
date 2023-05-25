const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());
app.use("/public/uploads", express.static("public/uploads"));
// app.use('/images', express.static('images'))
// routes
const productRoute = require("./routes/product.route");
const categoryRoute = require("./routes/category.route");
const writerRoute = require("./routes/writer.route");
const publicationRoute = require("./routes/publication.route");
const bookFairRoute = require("./routes/bookFair.route");
const couponRoute = require("./routes/coupon.route");
const orderRoute = require("./routes/order.route");
const reviewRoute = require("./routes/review.route");
const bannerRoute = require("./routes/banner.route");
const userRoute = require("./routes/user.route");

app.use("/api/v1/product", productRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/writer", writerRoute);
app.use("/api/v1/publication", publicationRoute);
app.use("/api/v1/book-fair", bookFairRoute);
app.use("/api/v1/coupon-add", couponRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/banner", bannerRoute);
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
app.use((err, req, res, next) => {
  if (err.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("There was an error");
  }
});
module.exports = app;
