const express = require("express");
const app = express();

const dbConnect = require("./config/db");
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

app.use(express.json());

dbConnect();

// routes
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
