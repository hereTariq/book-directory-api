const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// importing routes
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3200;

//  loading middlewares
app.use(express.json());
// route middlewares
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

mongoose
  .connect(process.env.DB)
  .then((result) => {
    console.log("connected");
    app.listen(PORT);
  })
  .catch((err) =>
    res.status(503).send("The server is busy. sorry for your inconvenience")
  );
