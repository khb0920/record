const mysql = require("mysql");

const db = mysql.createConnection({
    host: "hddb.c0s9behzy0hl.ap-northeast-2.rds.amazonaws.com",
    user: "hb",
    password: "dhdltlfgdj1!",
    database: "hbdb",
});

db.connect();

module.exports = db;