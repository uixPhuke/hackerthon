// middleware/serviceProviderAuth.js
const jwt = require("jsonwebtoken");
const ServiceProvider = require("../model/serviceProviderSchema");

const serviceProviderAuth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find service provider by ID
    const serviceProvider = await ServiceProvider.findById(decoded.id);
    if (!serviceProvider) {
      return res.status(404).json({ message: "Service provider not found" });
    }

    req.serviceProvider = serviceProvider; // Attach service provider to req
    next();
  } catch (error) {
    console.error("Service provider authentication error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = serviceProviderAuth;
