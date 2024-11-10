// routes/matiereRoutes.js
const express = require("express");
const router = express.Router();
const 
matiere
 = require("../controllers/matiereController");

router.post("/ajouter-matiere/:formationId", matiere.createMatiere);
router.put("/:formationId/:id", matiere.updateMatiere);
router.delete("/:formationId/:id", matiere.deleteMatiere);
router.get("/:formationId", matiere.getAllMatieres);
router.get("/:formationId/:id", matiere.getMatiereById);


module.exports = router;
