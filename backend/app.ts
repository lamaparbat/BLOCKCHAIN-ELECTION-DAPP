"use strict";

require("dotenv").config();
require("./database");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./src/presentation/routes/index");

// server config
const app = express();

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(routes);


module.exports = app;