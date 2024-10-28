const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // Required
  lastName: { type: String, required: true },  // Required
  email: { type: String, required: true, unique: true }, // Required and unique
  password: { type: String, required: true ,unique:true},   // Required
  contactInfo: { type: String, required: true }, // Required
  availability: { type: [String], required: true }, // Required
  ratings: { type: Number, default: 0 }, // Default ratings
  // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reference to reviews
  comment:[],
  serviceArea: {
    type: { type: String, enum: ["Point"], default: "Point" }, // GeoJSON type
    coordinates: { type: [Number], required: true }, // Required coordinates
  },
  servicesOffered: { type: [String], required: true }, // Required
  profileImage: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", // Default profile image
  },
});

// Export the model
module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);
