import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
 res.send("Server has started.");
});

module.exports = router