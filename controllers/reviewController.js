const Review = require("./../models/reviewModel");
const factory = require("./handlerFactory");

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// Get all reviews
exports.getAllReviews = factory.getAll(Review);

// Get single review
exports.getReview = factory.getOne(Review);

// Create new review
exports.createReview = factory.createOne(Review);

// update review
exports.updateReview = factory.updateOne(Review);

// Delete review
exports.deleteReview = factory.deleteOne(Review);
