



import { Router } from 'express';

const router = Router();
const { uploader } = require("../../../../configs/index.js");
const uploadController = require("../../controllers/uploads/index");

router.post('/upload/uploadFile', uploader.single("faqFile"), uploadController.uploadFile);

module.exports = router;
