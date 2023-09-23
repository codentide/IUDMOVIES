const { Router } = require("express");
const { createProductora } = require("../controllers/productoraController");

const router = Router();

router.post("/", createProductora);

module.exports = router;
