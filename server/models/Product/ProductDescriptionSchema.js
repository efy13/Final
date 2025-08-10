const mongoose = require("mongoose");

const ProductDescriptionSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductDescription", ProductDescriptionSchema);