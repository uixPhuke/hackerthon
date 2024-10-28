const Review = require("../model/reviewSchema");
const ServiceProvider = require("../model/seviceProviderSchema"); // Corrected import

const reviewCtrl = {
  addReview: async (req, res) => {
    const { serviceProviderId, rating, comment } = req.body;
    try {
      // Check if the user has already reviewed this service provider
      const existingReview = await Review.findOne({
        user: req.user._id,
        serviceProvider: serviceProviderId,
      });
      if (existingReview) {
        return res.status(400).json({ message: "You have already reviewed this service provider" });
      }

      const review = await Review.create({
        user: req.user._id,
        serviceProvider: serviceProviderId,
        rating,
        comment,
      });

      // Update provider's average rating
      const reviews = await Review.find({ serviceProvider: serviceProviderId });
      const averageRating = reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0; // Default to 0 if no reviews exist

      await ServiceProvider.findByIdAndUpdate(serviceProviderId, {
        ratings: averageRating,
        comment:comment
      });

      res.status(201).json({ success: true, review });
    } catch (error) {
      console.error("Error adding review:", error); // Log the error
      res.status(500).json({ message: error.message });
    }
  },

  getReviews: async (req, res) => {
    try {
      const reviews = await Review.find({
        serviceProvider: req.params.serviceProviderId,
      }).populate("user", "username");
      res.status(200).json({ reviews });
    } catch (error) {
      console.error("Error retrieving reviews:", error); // Log the error
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = reviewCtrl;
