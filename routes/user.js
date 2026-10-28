const express = require("express");
const WrapAsync = require("../utils/WrapAsync");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const usersController = require("../Controller/users");


// ===============================
// SIGNUP (FORM + CREATE USER)
// ===============================
router
  .route("/signup")
  .get(usersController.signupUser)
  .post(WrapAsync(usersController.createUser));

// ===============================
// LOGIN (FORM + AUTHENTICATE)
// ===============================

router
  .route("/login")
  .get(usersController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    WrapAsync(usersController.loginUser),
  );

// ===============================
// LOGOUT
// ===============================

router.post("/logout", usersController.logoutUser);
module.exports = router;
