"use strict";

require("dotenv").config();
const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./app/routes/index");

// server config
const app = express();
const PORT = process.env.PORT || 8088;

// middlewares
app.use(cors());
app.use(helmet());
app.use(routes);

// listening to the port
app.listen(PORT, () => console.log(`Listening to the port ${PORT}`));