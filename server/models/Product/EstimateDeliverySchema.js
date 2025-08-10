const mongoose = require("mongoose");

const EstimateDeliverySchema = new mongoose.Schema(
  {
    estimateDelivery: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EstimateDelivery", EstimateDeliverySchema);
