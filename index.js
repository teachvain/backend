const express = require("express");
var cookieParser = require("cookie-parser");
var jsw = require("jsonwebtoken")
var config = require("./config.json")
var bodyParser = require('body-parser')
const MEMBER = require("./models/MEMBER")
var http = require('http');


const app = express();
app.use(cookieParser());
app.use(bodyParser.json())

var server = http.createServer(app);
var io = require('socket.io')(server, {
  cors: {origin: "*"},
  path: "/api/socketio"
})
exports.io = io

//CORS Preflight request handler
app.use('*', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "held-oder-tyrann.tk")
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST")
  res.send();
})

//database
require("./database")

app.get("/api", (req, res) => {
  res.json({message: "This is the official Techvain API made by DustinDev2more."})
})

//PUBLIC API PATHS HERE

//authentication
app.use("/", require("./authentication"))

// routes
app.use("/api", require("./routes/index"))

//socket.io
require("./routes/socket/socketio")

server.listen(7869, () => {
  console.log("API is active and listenig on 7869");
});
