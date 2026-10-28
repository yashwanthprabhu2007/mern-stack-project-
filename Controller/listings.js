const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_KEY;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// ===============================
// INDEX ROUTE
// ===============================
module.exports.index = async (req, res) => {
  let filter = {};

  // Filter by Category
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Filter by Country Search
  if (req.query.search) {
    // 'i' makes it case-insensitive
    filter.country = { $regex: req.query.search, $options: 'i' };
  }

  let allList = await Listing.find(filter);

  res.render("listing/index.ejs", {
    allList,
    activeCategory: req.query.category || null,
    searchQuery: req.query.search || "", // Pass the search term back to the view
  });
};

// ===============================
// NEW LISTING FORM
// ===============================
module.exports.newListing = (req, res) => {
  res.render("listing/new.ejs");
};

// ===============================
// SHOW LISTING
// ===============================

module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const list = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!list) {
    req.flash("error", "Listing You are looking for does not exist!");
    return res.redirect("/listing");
  }

  res.render("listing/show.ejs", {
    list,
  });
};

// ===============================
// EDIT LISTING FORM
// ===============================

module.exports.editListing = async (req, res) => {
  const { id } = req.params;

  const list = await Listing.findById(id);

  if (!list) {
    req.flash("error", "Listing You are looking for does not exist!");
    res.redirect("/listing");
  }

  let originalImageUrl = list.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/h_300,w_250/e_blur:100",
  );

  res.render("listing/edit.ejs", {
    list,
    originalImageUrl,
  });
};

// ===============================
// CREATE LISTING
// ===============================

module.exports.createListing = async (req, res) => {
  // console.log("Received data:");
  // console.log(req.body);
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 2,
    })
    .send();
   
  let url = req.file.path;
  let filename = req.file.filename;
  const newList = new Listing(req.body.listing);
  newList.image = { url, filename };
  newList.owner = req.user._id;
  newList.geometry = response.body.features[0].geometry;  
  let resu = await newList.save();
  console.log(resu);
  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listing");
};

// ===============================
// UPDATE LISTING
// ===============================

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  if (!req.body || !req.body.listing) {
    throw new ExpressError(400, "Invalid Listing Data");
  }
  const updatedList = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    {
      runValidators: true,
      new: true,
    },
  );
  if (!updatedList) {
    throw new ExpressError(404, "Listing not found");
  }
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    Listing.image = { url, filename };
    await Listing.save();
  }

  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listing/${id}`);
};

// ===============================
// DELETE LISTING
// ===============================

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  const deletedList = await Listing.findByIdAndDelete(id);

  if (!deletedList) {
    throw new ExpressError(404, "Listing not found");
  }

  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listing");
};
