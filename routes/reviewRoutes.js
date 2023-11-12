const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");
const { get } = require("mongoose");
const router = express.Router({ mergeParams: true });

// Review Routes
// POST / tour/:tourId/reviews
// GET / tour/:tourId/reviews
// GET / tour/:tourId/reviews/:reviewId
router.use(authController.protect);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo("user"),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route("/:id")
  .get(reviewController.getReview)
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  )
  .patch(
    authController.restrictTo("user", "admin"),
    reviewController.updateReview
  );

module.exports = router;
