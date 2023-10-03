const { Router } = require("express");
const {
  createDirector,
  getDirectores,
  getDirectorByID,
  updateDirector,
  deleteDirector,
} = require("../controllers/directorController");

const router = Router();

router.get("/", getDirectores);
router.get("/:id", getDirectorByID);
router.post("/", createDirector);
router.put("/:id", updateDirector);
router.delete("/:id", deleteDirector);

module.exports = router;
