const { Router } = require("express");
const {
  createGenero,
  getGeneros,
  getGeneroByID,
  updateGenero,
  deleteGenero,
} = require("../controllers/generoController");

const router = Router();

router.post("/", createGenero);
router.get("/", getGeneros);
router.get("/:id", getGeneroByID);
router.put("/:id", updateGenero);
router.delete("/:id", deleteGenero);

module.exports = router;
