const Review = require("../models/Review");
const ServiceProvider = require("../model/reviewSchema");
const reviewCtrl = {
  addReview: async (req, res) => {
    const { serviceProviderId, rating, comment } = req.body;
    try {
      const review = await Review.create({
        user: req.user._id,
        serviceProvider: serviceProviderId,
        rating,
        comment,
      });

      // Update provider's average rating
      const reviews = await Review.find({ serviceProvider: serviceProviderId });
      const averageRating =
        reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
      await ServiceProvider.findByIdAndUpdate(serviceProviderId, {
        ratings: averageRating,
      });

      res.status(201).json({ success: true, review });
    } catch (error) {
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
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = reviewCtrl;