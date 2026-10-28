// MUST be first — forces Node to use public DNS for Atlas SRV lookups
require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);

if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const {MongoStore} = require('connect-mongo');
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

let dbUrl = process.env.MONGODB_URI;

// ===============================
// APP CONFIGURATION
// ===============================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// ===============================
// CORE MIDDLEWARE
// ===============================

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// ===============================
// SESSION + FLASH
// ===============================

const store =  MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  }, 
  touchAfter: 24 * 3600 ,

})
store.on("error",(err)=>{
    console.log("ERROR in MONGO SESSION STORE",err);
} )

const sessionkey = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionkey));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ===============================
// ROUTES
// ===============================

app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);
app.use('/', userRouter);


app.get("/", (req, res) => {
    res.redirect("/listing");
});



// ===============================
// 404 ROUTE
// ===============================

app.all("*path", (req, res, next) => {
  console.log("404 URL:", req.method, req.originalUrl);
  next(new ExpressError(404, "Page not found"));
});

// ===============================
// ERROR HANDLING MIDDLEWARE
// ===============================

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.log(err);

  const { status = 500, message = "Internal Server Error" } = err;

  res.status(status).render("err.ejs", { message });
});



// ===============================
// DATABASE CONNECTION + START SERVER
// ===============================

async function main() {
  await mongoose.connect(dbUrl, {
    serverSelectionTimeoutMS: 5000,
  });
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Connected to port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });