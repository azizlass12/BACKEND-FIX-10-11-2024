const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnect");
const path = require("path");
const { upload } = require("./config/upload");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the uploads directory after the project root
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Authentication Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// Protected Route Example
const { protect } = require("./middleware/authMiddleware");

app.get("/protected", protect, (req, res) => {
  res.send("This is a protected route");
});

// Other routes
const formationRoutes = require("./routes/formationRoutes");
const matiereRoutes = require("./routes/matiereRoutes");
const formateurRoutes = require("./routes/formateurRoutes");

app.use("/formation", formationRoutes);
app.use("/matiere", matiereRoutes);
app.use("/formateur", formateurRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => (err ? console.log(err) : console.log(`Server running on ${PORT}`)));
