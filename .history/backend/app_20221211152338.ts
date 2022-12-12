"use strict";

require("dotenv").config();
const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./app/routes/index");

// server config
const app = express();

// middlewares
app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(routes);


module.exports = app;