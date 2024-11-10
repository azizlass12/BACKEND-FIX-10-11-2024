// routes/formateurRoutes.js
const express = require("express");
const router = express.Router();
const {
  createFormateur,
  updateFormateur,
  deleteFormateur,
  getAllFormateurs,
} = require("../controllers/formateurController");

router.post("/ajoutFormateur", createFormateur); // Updated to match multer config
router.put("/:id", updateFormateur);
router.delete("/:id", deleteFormateur);
router.get("/", getAllFormateurs);

module.exports = router;
