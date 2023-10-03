const { Router } = require("express");
const {
  createProductora,
  getProductoras,
  getProductoraByID,
  updateProductora,
  deleteProductora,
} = require("../controllers/productoraController");

const router = Router();

router.post("/", createProductora);
router.get("/", getProductoras);
router.get("/:id", getProductoraByID);
router.put("/:id", updateProductora);
router.delete("/:id", deleteProductora);

module.exports = router;
