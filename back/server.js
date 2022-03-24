const express = require ('express')
const mongoose = require("mongoose")
const { use } = require('./route.js')
const Router = require("./route.js")
const app = express()


mongoose.connect("met ton url")

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});




app.use(Router);
app.listen(3000)
