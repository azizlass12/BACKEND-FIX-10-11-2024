// controllers/formateurController.js
const Formateur = require("../models/Formateur");
const upload = require("../config/upload");
const multer = require("multer");

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000"; // Ensure to set SERVER_URL

// Create a new formateur
exports.createFormateur = (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    try {
      const { name, expertise } = req.body;
      const imageUrl = req.file ? `${SERVER_URL}/uploads/formateur/${req.file.filename}` : null; // Set the image URL

      const newFormateur = new Formateur({
        name,
        expertise,
        image: imageUrl, // Save the image URL
      });

      await newFormateur.save();
      res.status(201).json({ message: "Formateur created successfully", newFormateur });
    } catch (error) {
      console.error("Error creating formateur:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

// Update an existing formateur
exports.updateFormateur = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If image is uploaded, update the image URL
    const imageUrl = req.file ? `${SERVER_URL}/uploads/formateur/${req.file.filename}` : null;
    if (imageUrl) {
      updates.image = imageUrl;
    }

    const formateur = await Formateur.findByIdAndUpdate(id, updates, { new: true });

    if (!formateur) {
      return res.status(404).json({ message: "Formateur not found" });
    }

    res.json({ message: "Formateur updated successfully", formateur });
  } catch (error) {
    console.error("Error updating formateur:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a formateur
exports.deleteFormateur = async (req, res) => {
  try {
    const { id } = req.params;

    const formateur = await Formateur.findByIdAndDelete(id);

    if (!formateur) {
      return res.status(404).json({ message: "Formateur not found" });
    }

    res.json({ message: "Formateur deleted successfully" });
  } catch (error) {
    console.error("Error deleting formateur:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all formateurs
exports.getAllFormateurs = async (req, res) => {
  try {
    const formateurs = await Formateur.find();
    res.json(formateurs);
  } catch (error) {
    console.error("Error fetching formateurs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
