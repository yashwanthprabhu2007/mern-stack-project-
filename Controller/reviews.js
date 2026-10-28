const Listing = require("../models/listing");
const Review = require("../models/review");

// ===============================
// CREATE REVIEW
// ===============================

module.exports.createReview = (async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) throw new ExpressError(404, "Listing not found");

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "Successfully added a new review!");
    res.redirect(`/listing/${listing._id}`);
  })

// ===============================
// DELETE REVIEW
// =============================== 

module.exports.deleteReview = (async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted the review!");
    res.redirect(`/listing/${id}`);
  });


// ===============================
// Deleting Reviews
// Mongo $pull operator
// $pull
// The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
// ===============================
