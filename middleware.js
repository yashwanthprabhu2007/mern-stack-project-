const Listing = require("./models/listing");
const { listingSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
const Review = require("./models/review");

// ===============================
// AUTHENTICATION MIDDLEWARE
// ===============================
module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to do changes");
    return res.redirect("/login");
  }
  next();
};

// ===============================
// REDIRECT URL MIDDLEWARE
// ===============================
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// ===============================
// AUTHORIZATION MIDDLEWARE (OWNERSHIP)
// ===============================
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You Don't have permission");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

// ===============================
// VALIDATION MIDDLEWARE FOR LISTING
// ===============================
module.exports.ValidationError = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// ===============================
// VALIDATION MIDDLEWARE FOR REVIEWS
// ===============================
module.exports.ValidationReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

module.exports.isReviewauthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listing/${id}`);
  }
  next();
};
