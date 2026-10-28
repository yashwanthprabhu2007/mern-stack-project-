const User = require("../models/user");

// ===============================
// SIGNUP FORM
// ===============================
module.exports.signupUser = (req, res) => {
  res.render("users/signup.ejs");
};

// ===============================
// CREATE NEW USER
// ===============================
module.exports.createUser = (async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registered = await User.register(newUser, password);

    req.login(registered, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Airbnb");
      res.redirect("/listing");
    });
  } catch (e) {
    if (e.name === "UserExistsError") {
      req.flash("error", "User already exists. Try a different username.");
    } else {
      req.flash("error", e.message);
    }
    res.redirect("/signup");
  }
});

// ===============================
// LOGIN FORM  (GET)
// ===============================
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// ===============================
// AUTHENTICATE USER (POST)
// ===============================
module.exports.loginUser = (async(req, res) => {
  req.flash("success", "Welcome back to Airbnb");
  const redirectUrl = res.locals.redirectUrl || "/listing";
  res.redirect(redirectUrl);
});

// ===============================
// LOGOUT
// ===============================
module.exports.logoutUser = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash("success", "Thank you for using Airbnb");
    res.redirect("/listing");
  });
};