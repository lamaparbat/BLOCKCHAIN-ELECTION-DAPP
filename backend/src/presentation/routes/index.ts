import { Router } from "express";

const defaultRoutes = require("./default.routes");
const voterRoutes = require("./voters/index");
const partyRoutes = require("./party/index");
const router = Router();

router.use([defaultRoutes, voterRoutes, partyRoutes]);

module.exports = router;



