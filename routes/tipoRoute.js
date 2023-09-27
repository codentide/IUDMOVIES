const { Router } = require("express");
const {
  createTipo,
  getTipos,
  getTipoByID,
  updateTipo,
  deleteTipo,
} = require("../controllers/tipoController");

const router = Router();

router.post("/", createTipo);
router.get("/", getTipos);
router.get("/:id", getTipoByID);
router.put("/:id", updateTipo);
router.delete("/:id", deleteTipo);

module.exports = router;
