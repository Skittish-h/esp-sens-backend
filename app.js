// import express and mutipart form handler
const express = require('express');
var multer = require('multer');

// import controllers
const storageController = require('./Controllers/uploadController');
const espInsert = require("./Controllers/espInsertController");
const rpiInsert = require("./Controllers/rpiInsertController");

// use multiplart form handler
const middleware =  multer({storage: storageController});

// initialize express app
const app = express();
const port = 8000;

// routing
app.get("/", (req, res) => espInsert(req, res));
app.post("/", middleware.single("file"), (req, res) => rpiInsert(req, res));
app.use("/upload", express.static(__dirname + "/upload"))

// run express app on port "port"
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})