const express = require("express");
const reviewCtrl = require("../controller/reviewCtrl"); // Adjust the path as necessary
const userAuth = require('../middleware/userAuth');



const router = express.Router();

// Route to add a review
router.post("/add",userAuth, reviewCtrl.addReview);

// Route to get reviews for a specific service provider
router.get("/:serviceProviderId", reviewCtrl.getReviews);

module.exports = router;
