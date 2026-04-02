require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",require("./routes/auth.routes"));
app.use("/api/categories",require("./routes/category.routes"));
app.use("/api/products",require("./routes/product.routes"));

app.listen(process.env.PORT,()=>{
    console.log("Server Running");
});