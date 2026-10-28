const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");
const { isLoggedIn, isOwner, ValidationError } = require("../middleware");
const listingsController = require("../Controller/listings");
const multer  = require('multer')
const {storage} = require('../Cloudeconfig');
const upload = multer({ storage })

// ===============================
// INDEX + CREATE LISTING
// ===============================

router
  .route("/")
  .get(WrapAsync(listingsController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    ValidationError,
    WrapAsync(listingsController.createListing),
  );
  

// ===============================
// NEW LISTING FORM
// ===============================

router.get("/new", isLoggedIn, listingsController.newListing);

// ===============================
// SHOW + UPDATE + DELETE LISTING
// ===============================

router
  .route("/:id")
  .get(WrapAsync(listingsController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    ValidationError,
    WrapAsync(listingsController.updateListing),
  )
  .delete(isLoggedIn, isOwner, WrapAsync(listingsController.deleteListing));

// ===============================
// EDIT LISTING FORM
// ===============================

router.get(
  "/:id/edit",
  isLoggedIn,
  
  isOwner,
  WrapAsync(listingsController.editListing),
);

module.exports = router;