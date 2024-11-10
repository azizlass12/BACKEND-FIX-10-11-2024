// routes/formationRoutes.js
const express = require("express");
const router = express.Router();
const {
  createFormation,
  updateFormation,
  deleteFormation,
  getAllFormations,
  getFormationById,
} = require("../controllers/formationController");

router.post("/ajouter-formation", createFormation);
router.put("/edit/:id", updateFormation);
router.delete("/delete/:id", deleteFormation);
router.get("/all", getAllFormations);
router.get("/:id", getFormationById);

module.exports = router;

