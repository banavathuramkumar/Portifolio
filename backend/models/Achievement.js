const mongoose = require("mongoose");

const achievementSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add an achievement title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    date: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Achievement", achievementSchema);
