require("dotenv").config();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const app = express();

const port = process.env.PORT || 9000;

//db connnection
mongoose
  .connect(process.env.URI)
  .then(() => console.log("DATABASE CONNECTED SUCCESFULLY.....!"))
  .catch(() => console.log("DB CONNECTION ERROR"));

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

//start a server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
