const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["work", "education"], default: "work" },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Experience", experienceSchema);
