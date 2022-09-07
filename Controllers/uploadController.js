const fs = require('fs');
const multer = require('multer');
const { randomUUID } = require("crypto");


// pretty standard express JS stuff
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      let path = `upload`;
      cb(null, path);
  },
  filename: (req, file, cb) => {
      console.log(file);
      cb(null, randomUUID()+".mp4");
  }
})

module.exports = storage; 