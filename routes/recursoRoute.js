const { Router } = require("express");
const { createRecurso } = require("../controllers/recursoController");

const router = Router();

router.post("/", createRecurso);

module.exports = router;
