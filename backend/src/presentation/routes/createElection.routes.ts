import { Router } from 'express';

const router = Router();
const { createElectionController } = require("../controllers/index");

router.post('/admin/createElection', createElectionController.createElection);

module.exports = router;