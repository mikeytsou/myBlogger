const express = require("express");
      mongoose = require("mongoose");
      bodyParser = require("body-parser");
      session = require("express-session");
      passport = require("passport");
      LocalStrategy = require("passport-local");
      methodOverride = require("method-override");
      expressSanitizer = require("express-sanitizer");
      flash = require("connect-flash");
      app = express();
// ROUTES
      userRoutes = require("./routes/users")
      postRoutes = require("./routes/posts");
      commentRoutes = require("./routes/comments");

// APP CONFIG
const url = process.env.DATABASEURL || "mongodb://localhost/my_blogger"
mongoose.connect(url); // export DATABASEURL=mongodb://localhost/my_blogger
app.locals.moment = require("moment");
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());
app.set("view engine", "ejs");

// PASSPORT CONFIG
app.use(session({
  secret: "THIS IS A SECRET",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// HELPERS
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// ROUTES
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);

// MISSING ROUTE
app.get("*", function(req, res) {
  res.send("PAGE NOT FOUND");
});

// SERVER
app.listen(process.env.PORT || 3000, function() {
  console.log("CONNECTED TO PORT 3000");
});