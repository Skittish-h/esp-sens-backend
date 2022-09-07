// Model file for interfacing sql library

var mysql = require('mysql2');

// initialize connection to DB
const con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "novacoltura"
});

module.exports = con;