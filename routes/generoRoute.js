const { Router } = require("express");
const { createGenero } = require("../controllers/generoController");

const router = Router();

router.post("/", createGenero);

module.exports = router;
