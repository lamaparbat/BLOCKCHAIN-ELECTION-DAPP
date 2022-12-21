import mongoose from "mongoose";
const process = require("process");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).then(
 () => console.log("Connected to Mongo DB"),
 (err) => console.log(err)
);