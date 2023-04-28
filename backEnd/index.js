const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

//app setup
const db = mongoose.connect("mongodb://127.0.0.1:27017/booklistAuth");
app.use(morgan("combined"));
app.options("*", cors());
app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));
router(app);

//server setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
