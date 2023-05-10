import { Router } from 'express';

const router = Router();
const { uploader } = require("../../../../configs/index.js");
const { candidateController } = require("../../controllers/index");

router.post('/candidate/signup', uploader.single("profile"), candidateController.candidateSignup);
router.get('/candidate/lists', candidateController.getCandidateLists);
router.post('/party/signup', uploader.single("logo"), candidateController.partySignup);
router.get('/party/lists', candidateController.getPartyLists);

module.exports = router;