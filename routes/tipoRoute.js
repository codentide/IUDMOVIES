const { Router } = require("express");
const { createTipo } = require("../controllers/tipoController");

const router = Router();

router.post("/", createTipo);

module.exports = router;
