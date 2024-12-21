const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const db = require("./config/mongodb");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api" , require("./routes/api.route"));


module.exports = app;
