const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String},
  country: { type: String },
});

// Add location schema for geospatial queries
const locationSchema = new Schema({
  type: { type: String, enum: ['Point'], default: 'Point' },
  coordinates: { type: [Number],  } // [longitude, latitude]
});


  const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String,  },
    lastName: { type: String, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String,default:""},
    role: {
      type: String,
      enum: ["admin", "user","service"],
      default: "user",
    },
    profileImage: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    bio: { type: String },
    address: addressSchema,
    location: locationSchema,
    createdAt: { type: Date, default: Date.now },
  });
  

// Create a 2dsphere index on the location field for geospatial queries
userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);

