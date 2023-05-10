"use strict";
const firebaseStorageService = require("./firebaseStorageService");
const pusherInstance = require("./pusherConfig");
module.exports = {
    firebaseStorageService,
    uploader: require("./multer"),
    pusherInstance
};
