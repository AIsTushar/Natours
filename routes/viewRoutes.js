const express = require("express");
const viewController = require("../controllers/viewsController");
const bookingController = require("../controllers/bookingController");
const AppError = require("./../utils/appError");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/me", authController.protect, viewController.getAcountPage);
router.get("/my-tours", authController.protect, viewController.getMyTours);

router.use(authController.isLoggedIn);

router.get(
  "/",
  bookingController.createBookingCheckout,
  viewController.getOverview
);
router.get("/tour/:slug", viewController.getTour);
router.get("/signup", viewController.getsignUpForm);
router.get("/login", viewController.getLoginForm);

module.exports = router;
