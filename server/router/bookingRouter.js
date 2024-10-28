const express = require("express");
const bookingCtrl = require("../controller/bookingCtrl");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

// Route to create a booking
router.post("/add", userAuth, bookingCtrl.createBooking);

// Route to get bookings for the logged-in user
router.get("/user", userAuth, bookingCtrl.getUserBookings);

// Route to get bookings for a specific service provider
router.get("/provider/:serviceProviderId", bookingCtrl.getProviderBookings);

// Route to update booking status
router.patch("/:bookingId/status", bookingCtrl.updateBookingStatus);

module.exports = router;
