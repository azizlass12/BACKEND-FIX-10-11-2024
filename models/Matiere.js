const mongoose = require("mongoose");

const MatiereSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formation',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,  // Or false, depending on your logic
  },
  instructor: {
    type: String,
    required: true,  // Or false, based on your requirement Author
  },
  duration: {
    type: String,  // e.g., "3 hours", "45 minutes"
    required: true, 
  },
  level: {
    type: String,  // e.g., "beginner", "intermediate", "advanced"
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  materialType: {
    type: [String],  // Array to hold multiple types (e.g., ["PDF", "Videos", "Slides"])
    required: false,
  },
  price: {
    type: String,  // e.g., "Free" or "$19.99"
    required: true,
  },
  rating: {
    type: Number,  // Average rating
    default: 0,
  },
  reviews: {
    type: [String],  // Array to hold user reviews
  },
  prerequisites: {
    type: [String],  // Array of prerequisites
  },
  enrollments: {
    type: Number,  // Count of students enrolled
    default: 0,
  },
  releaseDate: {
    type: Date,
    required: false,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  downloadLink: {
    type: String, // Single download URL
    required: false, // Set to true if it must be provided
  },
  
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Matiere", MatiereSchema);
