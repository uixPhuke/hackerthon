const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  availability: { type: [String], required: true },
  ratings: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  serviceArea: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  servicesOffered: { type: [String], required: true },
});

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);
