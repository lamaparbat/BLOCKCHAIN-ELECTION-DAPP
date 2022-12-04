import { Router } from "express";

const defaultRoutes = require("./default.routes");
const voterRoutes = require("./voter.routes");

const router = Router();

router.use(defaultRoutes);
router.use(voterRoutes);

module.exports = router;



