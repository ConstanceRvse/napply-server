const express = require("express");
const Booking = require("../models/booking-model.js");
const User = require("../models/user-model.js");
const router = express.Router();

router.post("/location", (req, res, next) => {
  const { truck_id, user_id } = req.body;

  Booking.create({ truck_id, user_id })
    .then(bookingDoc => res.json(bookingDoc))
    .catch(err => next(err));
});

router.put("/options/:id", (req, res, next) => {
  const { id } = req.params;
  const { sound, plaid, energyShot } = req.body;

  Booking.findByIdAndUpdate(
    id,
    { $set: { sound, plaid, energyShot } },
    { runValidators: true, new: true }
  )
    .then(bookingDoc => res.json(bookingDoc))
    .catch(err => next(err));
});

router.get("/booking-date", (req, res, next) => {
  const { day } = req.params;
  Booking.find({
    date: {
      $gt: new Date(year, month, day, 0, 0),
      $lt: new Date(year, month, day, 23, 59)
    }
  })
    .then(bookingResults => res.json(bookingResults))
    .catch(err => next(err));
});

router.post("/booking-date", (res, req, next) => {
  const { booked, user_id, date } = req.body;

  Booking.create({ booked, user_id, date })
    .then(bookingDoc => res.json(bookingDoc))
    .catch(err => next(err));
});

router.delete("/booking-date/:id", (res, req, next) => {
  const { id } = req.params;
  Booking.findByIdAndRemove(id)
    .then(bookingDoc => res.json(bookingDoc))
    .catch(err => next(err));
});

module.exports = router;
