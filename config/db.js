const mysql = require("mysql");
require('dotenv').config();

const db = mysql.createConnection({
    multipleStatemens:true,
    host: process.env.DB_HOST_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
});

db.connect();

module.exports = db;