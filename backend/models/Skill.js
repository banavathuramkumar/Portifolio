const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    names: { type: [String], required: true }, // Array of skill names under this category
    level: { type: Number, default: 90, min: 0, max: 100 }, // Category proficiency percentage level
    order: { type: Number, default: 0 },       // Display order number for the entire category
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", skillSchema);
