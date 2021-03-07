const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const cors = require('cors')


//package de xay duong dan
const path = require("path");



//
require("./db/connect");

//import router
const categoryRouter = require("./routers/category");
const postRouter = require("./routers/post");
const uploadRouter = require("./routers/upload");


//
const app = express();


console.log();

//tao duong dan tinh cho image
const imageFolderPath = path.join(__dirname, "images");

app.use(cors({
    origin: "http://localhost:5500",
    optionsSuccessStatus: 200,
}));

app.use(bodyParser.json())
app.use("/images", express.static(imageFolderPath));

//su dung router
app.use(categoryRouter);
app.use(postRouter);
app.use(uploadRouter);

const port = process.env.PORT || config.get("port");

app.listen(port, () => {
    console.log("connected....");
});