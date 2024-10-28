const express = require("express");
const serviceProviderCtrl = require("../controller/serviceProdiverCtrl");
const router = express.Router();

// Routes for service providers
router.post("/register", serviceProviderCtrl.registerProvider); // Register a new provider
router.post("/login", serviceProviderCtrl.loginProvider); // Login a provider
router.get("/logout", serviceProviderCtrl.logoutProvider); // Logout a provider
router.get("/", serviceProviderCtrl.getProviders); // Get all providers
router.get("/:id", serviceProviderCtrl.getProviderById); // Get provider by ID
router.put("/:id", serviceProviderCtrl.updateProvider); // Update provider
router.delete("/:id", serviceProviderCtrl.deleteProvider); // Delete provider

module.exports = router;
