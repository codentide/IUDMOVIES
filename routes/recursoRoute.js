const { Router } = require("express");
const {
  createRecurso,
  getRecursos,
  getRecursoByID,
  updateRecurso,
  deleteRecurso,
} = require("../controllers/recursoController");

const router = Router();

router.post("/", createRecurso);
router.get("/", getRecursos);
router.get("/:id", getRecursoByID);
router.put("/:id", updateRecurso);
router.delete("/:id", deleteRecurso);

module.exports = router;
