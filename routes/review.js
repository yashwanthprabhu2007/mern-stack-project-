const express = require("express");
const router = express.Router({ mergeParams: true }); //  key fix
const WrapAsync = require("../utils/WrapAsync");
const {
  ValidationReview,
  isLoggedIn,
  isReviewauthor,
} = require("../middleware");
const reviewsController = require('../Controller/reviews')


// ===============================
// CREATE REVIEW
// ===============================

router.post(
  "/",
  isLoggedIn,
  ValidationReview,
  WrapAsync(reviewsController.createReview),
);

// ===============================
// DELETE REVIEW
// ===============================



router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewauthor,
  WrapAsync(reviewsController.deleteReview),
);

module.exports = router;
