const Booking = require("../model/bookingSchema");
const ServiceProvider = require("../model/seviceProviderSchema");

const bookingCtrl = {
  createBooking: async (req, res) => {
    const { serviceProviderId, date, timeSlot } = req.body;

    try {
      // Create a new booking
      const booking = await Booking.create({
        user: req.user._id,
        serviceProvider: serviceProviderId,
        date,
        timeSlot,
      });

      res.status(201).json({ success: true, booking });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getUserBookings: async (req, res) => {
    try {
      // Find all bookings for the authenticated user
      const bookings = await Booking.find({ user: req.user._id })
        .populate("serviceProvider", "name")
        .populate("user", "username");

      res.status(200).json({ success: true, bookings });
    } catch (error) {
      console.error("Error retrieving user bookings:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getProviderBookings: async (req, res) => {
    try {
      // Find all bookings for a specific service provider
      const bookings = await Booking.find({
        serviceProvider: req.params.serviceProviderId,
      }).populate("user", "username");

      res.status(200).json({ success: true, bookings });
    } catch (error) {
      console.error("Error retrieving provider bookings:", error);
      res.status(500).json({ message: error.message });
    }
  },

  updateBookingStatus: async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    try {
      // Update the booking status
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
      );

      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found.. try again" });
      }

      res.status(200).json({ success: true, updatedBooking });
    } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = bookingCtrl;
