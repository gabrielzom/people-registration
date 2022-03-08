const express = require("express");
const home = express.Router();

home.use(express.static("public"))