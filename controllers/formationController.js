const Formation = require("../models/Formation");
const upload = require("../config/upload");
const multer = require("multer");

const SERVER_URL = "http://localhost:5000"; // Define the server's base URL

// Create a new formation
exports.createFormation = (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { name, description,price,TotalStudents,Duration,Categorie,rating } = req.body;
      // Save the full image URL (http://localhost:5000/uploads/formation/...)
      const imageUrl = req.file ? `${SERVER_URL}/uploads/formation/${req.file.filename}` : null;

      const newFormation = new Formation({
        name,
        description,
        image: imageUrl, // Store the full URL in the database,*
        price,
        TotalStudents,
        Duration,
        Categorie,
        rating
      });

      await newFormation.save();

      res.status(201).json({ 
        message: "Formation created successfully", 
        newFormation, 
        imageUrl // Include the full image URL in the response
      });
    } catch (error) {
      console.error("Error creating formation:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

// Other controller methods stay the same
  

// Update an existing formation
exports.updateFormation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const formation = await Formation.findByIdAndUpdate(id, updates, { new: true });
    
    if (!formation) {
      return res.status(404).json({ message: "Formation not found" });
    }

    res.json({ message: "Formation updated successfully", formation });
  } catch (error) {
    console.error("Error updating formation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a formation
exports.deleteFormation = async (req, res) => {
  try {
    const { id } = req.params;

    const formation = await Formation.findByIdAndDelete(id);

    if (!formation) {
      return res.status(404).json({ message: "Formation not found" });
    }

    res.json({ message: "Formation deleted successfully" });
  } catch (error) {
    console.error("Error deleting formation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all formations
exports.getAllFormations = async (req, res) => {
  try {
    const formations = await Formation.find().populate('matieres');
    res.json(formations);
  } catch (error) {
    console.error("Error fetching formations:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a formation by ID
exports.getFormationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const formation = await Formation.findById(id).populate('matieres');

    if (!formation) {
      return res.status(404).json({ message: "Formation not found" });
    }

    res.json(formation);
  } catch (error) {
    console.error("Error fetching formation by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
