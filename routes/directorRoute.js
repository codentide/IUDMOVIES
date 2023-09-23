const { Router } = require("express");
const { createDirector } = require("../controllers/directorController");

const router = Router();

router.post("/", createDirector);

module.exports = router;
