const mongoose = require("mongoose");

const certificateSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a certificate title"],
    },
    issuer: {
      type: String,
      required: [true, "Please add an issuer"],
    },
    date: {
      type: String,
    },
    link: {
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

module.exports = mongoose.model("Certificate", certificateSchema);
