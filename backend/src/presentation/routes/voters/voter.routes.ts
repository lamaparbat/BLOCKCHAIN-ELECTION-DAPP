import { Router } from 'express';

const router = Router();
const { uploader } = require("../../../../configs/index.js");
const { voterController } = require("../../controllers/index.controller");

router.post('/voter/signup', uploader.single("profile"), voterController.voterSignup);
router.get('/voter/lists', voterController.getVoterLists);

module.exports = router;