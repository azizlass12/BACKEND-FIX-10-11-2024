const mongoose = require("mongoose");

const FormateurSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Formateur", FormateurSchema);
