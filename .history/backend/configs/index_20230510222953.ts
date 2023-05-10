const firebaseStorageService = require("./firebaseStorageService.json");
require("./multer");
const pusherInstance = require("./pusherConfig");

module.exports = {
  firebaseStorageService,
  uploader,
  pusherInstance
}