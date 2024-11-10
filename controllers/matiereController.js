const Matiere = require("../models/Matiere");
const Formation = require("../models/Formation");
const upload = require("../config/upload");
const multer = require("multer");

const SERVER_URL = "http://localhost:5000"; // Define the server's base URL

// Create a new matiere for a specific formation
exports.createMatiere = (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { formationId } = req.params;
      const {
        name,
        description,
        category,
        instructor,
        duration,
        level,
        language,
        materialType,
        price,
        releaseDate,
        prerequisites,
        rating,
        downloadLink, // Single link
      } = req.body;

      const imageUrl = req.file ? `${SERVER_URL}/uploads/matiere/${req.file.filename}` : null;

      const newMatiere = new Matiere({
        name,
        description,  
        formation: formationId,
        image: imageUrl,
        category,
        instructor,
        duration,
        level,
        language,
        materialType: Array.isArray(materialType) ? materialType : [],
        price,
        releaseDate,
        rating,
        prerequisites: Array.isArray(prerequisites) ? prerequisites : [],
        downloadLink: downloadLink || null, // Assign the single link
        lastUpdated: new Date(),
      });

      await newMatiere.save();
      await Formation.findByIdAndUpdate(formationId, { $push: { matieres: newMatiere._id } });

      res.status(201).json({ 
        message: "Matiere created successfully", 
        newMatiere,
      });
    } catch (error) {
      console.error("Error creating matiere:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};


// Update an existing matiere
exports.updateMatiere = async (req, res) => {
  console.log("Request params:", req.params);  
  console.log("Request body:", req.body);      

  try {
    const { formationId, id } = req.params;    
    const updates = req.body;                   

    console.log("Received updates:", updates);  

    const matiere = await Matiere.findByIdAndUpdate(id, updates, { new: true });

    if (!matiere) {
      console.log(`Matiere with id ${id} not found.`);  
      return res.status(404).json({ message: "Matiere not found" });
    }

    console.log("Matiere updated successfully:", matiere); 
    res.json({ message: "Matiere updated successfully", matiere });
  } catch (error) {
    console.error("Error updating matiere:", error);  
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a matiere
exports.deleteMatiere = async (req, res) => {
  try {
    const { formationId, id } = req.params;

    const matiere = await Matiere.findByIdAndDelete(id);

    if (!matiere) {
      return res.status(404).json({ message: "Matiere not found" });
    }

    // Remove the matiere from the formation's matieres array
    await Formation.findByIdAndUpdate(formationId, { $pull: { matieres: id } });

    res.json({ message: "Matiere deleted successfully" });
  } catch (error) {
    console.error("Error deleting matiere:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all matieres for a specific formation
exports.getAllMatieres = async (req, res) => {
  try {
    const { formationId } = req.params;
    const matieres = await Matiere.find({ formation: formationId });

    res.json(matieres);
  } catch (error) {
    console.error("Error fetching matieres:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a matiere by ID
exports.getMatiereById = async (req, res) => {
  try {
    const { formationId, id } = req.params;

    const matiere = await Matiere.findById(id);

    if (!matiere || matiere.formation.toString() !== formationId) {
      return res.status(404).json({ message: "Matiere not found" });
    }

    res.json(matiere);
  } catch (error) {
    console.error("Error fetching matiere by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
