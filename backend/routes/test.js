const { Router } = require("express");
const { testGet } = require("../controllers/testControl");
const router = Router();

router.get("/test", testGet);

module.exports = router;
