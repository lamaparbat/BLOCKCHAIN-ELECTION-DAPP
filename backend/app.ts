"use strict";

require("dotenv").config();
import express from 'express';
const routes = require("./app/routes/index");

// server config
const app = express();
const PORT = process.env.PORT || 8088;

// middlewares
app.use(routes);

// listening to the port
app.listen(PORT, () => {
 console.log(`Listening to the port ${PORT}`);
});