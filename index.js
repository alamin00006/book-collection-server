require("dotenv").config();
const DBConnect = require("./utilis/dbConnect");
const app = require("./app");

DBConnect();
// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
