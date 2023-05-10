import { Router } from 'express';

const router = Router();
const { uploader } = require("../../../../configs/index.ts");
const { voterController } = require("../../controllers/index");

router.post('/voter/signup', uploader.single("profile"), voterController.voterSignup);
router.get('/voter/lists', voterController.getVoterLists);

module.exports = router;