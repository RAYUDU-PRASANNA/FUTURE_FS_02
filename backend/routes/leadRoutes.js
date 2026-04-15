const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createLead,
  getLeads,
  deleteLead,
  updateLead,
} = require("../controllers/leadController");

// PUBLIC → user submits form
router.post("/", createLead);

// PROTECTED → admin access
router.get("/", protect, getLeads);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

module.exports = router;