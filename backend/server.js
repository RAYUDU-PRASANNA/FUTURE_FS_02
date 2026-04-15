const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Import DB
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

// Load env variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "*", // later change to your frontend URL
}));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("CRM Backend Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// ✅ START SERVER (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});