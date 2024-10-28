const ServiceProvider = require("../model/seviceProviderSchema");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcryptjs')

// Utility functions to format address and location
const formatAddress = (address) => ({
  street: address.street,
  city: address.city,
  state: address.state,
  zipCode: address.zipCode,
  country: address.country,
});

const formatLocation = (longitude, latitude) => ({
  type: "Point",
  coordinates: [longitude, latitude],
});

const serviceProviderCtrl = {
  // Register a new service provider
  registerProvider: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        contactInfo,
        availability,
        serviceArea,
        servicesOffered,
        profileImage,
      } = req.body;

      // Check if the service provider already exists
      const existingProvider = await ServiceProvider.findOne({ email });
      if (existingProvider) {
        return res.status(400).json({ message: "Service provider already exists" });
      }

      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 12);

      const newProvider = new ServiceProvider({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        contactInfo,
        availability,
        serviceArea,
        servicesOffered,
        profileImage: profileImage || undefined, // Use default if no image provided
      });

      await newProvider.save();
      res.status(201).json({ message: "Service provider registered successfully", provider: newProvider });
    } catch (error) {
        console.error("Error details:", error); // Log the error for debugging
        res.status(500).json({ message: "Error registering service provider", error: error.message });
      
    }
  },
   // Login a service provider
   loginProvider: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the service provider exists
      const provider = await ServiceProvider.findOne({ email });
      if (!provider) {
        return res.status(404).json({ message: "Service provider not found" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, provider.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create and assign JWT tokens
      const accesstoken = createAccessToken({ id: provider._id });
      const refreshtoken = createRefreshToken({ id: provider._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/provider/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "None", // For cross-origin requests
        secure: true, // Ensure secure cookie in production (HTTPS)
      });

      const providerData = {
        _id: provider._id,
        firstName: provider.firstName,
        lastName: provider.lastName,
        email: provider.email,
        contactInfo: provider.contactInfo,
        availability: provider.availability,
        ratings: provider.ratings,
        servicesOffered: provider.servicesOffered,
        profileImage: provider.profileImage,
      };

      res.json({ accesstoken, provider: providerData });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  },

  // Logout a service provider
  logoutProvider: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/provider/refresh_token" });
      return res.json({ msg: "Log Out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Refresh token handler
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;

      if (!rf_token) return res.status(400).json({ msg: "Please login or register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, provider) => {
        if (err) return res.status(400).json({ msg: "Please login or register" });

        const accessToken = createAccessToken({ id: provider.id });
        res.json({ accessToken });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Get all service providers
  getProviders: async (req, res) => {
    try {
      const providers = await ServiceProvider.find().populate("user", "username");
      res.status(200).json({ providers });
    } catch (error) {
      res.status(500).json({ message: "Error fetching service providers", error });
    }
  },

  // Get a single service provider by ID
  getProviderById: async (req, res) => {
    try {
      const provider = await ServiceProvider.findById(req.params.id).populate("user", "username");
      if (!provider) return res.status(404).json({ message: "Service provider not found" });

      res.status(200).json({ provider });
    } catch (error) {
      res.status(500).json({ message: "Error fetching service provider", error });
    }
  },

  // Update a service provider
  updateProvider: async (req, res) => {
    try {
      const updates = req.body;

      if (updates.address) {
        updates.address = formatAddress(updates.address);
      }

      if (updates.longitude && updates.latitude) {
        updates.serviceArea = formatLocation(updates.longitude, updates.latitude);
      }

      const updatedProvider = await ServiceProvider.findByIdAndUpdate(req.params.id, updates, { new: true });

      if (!updatedProvider)
        return res.status(404).json({ message: "Service provider not found" });

      res.status(200).json({ message: "Service provider updated successfully", provider: updatedProvider });
    } catch (error) {
      res.status(500).json({ message: "Error updating service provider", error });
    }
  },

  // Delete a service provider
  deleteProvider: async (req, res) => {
    try {
      const deletedProvider = await ServiceProvider.findByIdAndDelete(req.params.id);

      if (!deletedProvider)
        return res.status(404).json({ message: "Service provider not found" });

      res.status(200).json({ message: "Service provider deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting service provider", error });
    }
  },
};

// Token management functions
const createAccessToken = (provider) => {
  return jwt.sign(provider, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const createRefreshToken = (provider) => {
  return jwt.sign(provider, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = serviceProviderCtrl;
