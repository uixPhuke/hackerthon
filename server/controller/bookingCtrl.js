const Booking = require("../model/bookingSchema");

const bookingCtrl = {
  createBooking: async (req, res) => {
    const { serviceProviderId, date, timeSlot } = req.body;
    try {
      const booking = await Booking.create({
        user: req.user._id,
        serviceProvider: serviceProviderId,
        date,
        timeSlot,
      });
      res.status(201).json({ success: true, booking });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBookings: async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user._id }).populate(
        "serviceProvider",
        "name"
      );
      res.status(200).json({ bookings });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateBookingStatus: async (req, res) => {
    try {
      const { bookingId, status } = req.body;
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
      );
      res.status(200).json({ success: true, booking });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports=bookingCtrl