const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const home = require('./routes/home');

app.set("views", "./views");
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);


app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use("/image", express.static("./upload")); 
app.use("/", home);

module.exports = app;