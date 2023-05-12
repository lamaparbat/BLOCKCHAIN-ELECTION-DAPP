



import { Router } from 'express';

const router = Router();
const { uploader } = require("../../../../configs/index");
const uploadController = require("../../controllers/uploads/index");

router.post('/upload/uploadFile', uploader.array("images"), uploadController.uploadFile);

module.exports = router;
