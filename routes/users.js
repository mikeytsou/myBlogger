const express = require("express");
      passport = require("passport");
      middleware = require("../middleware/index");
      router = express.Router();
// MODELS
      User = require("../models/user");

// NEW - user
router.get("/users/new", function(req, res) {
  res.render("users/new");
});

// CREATE - user
router.post("/users", function(req, res) {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    picture: req.body.picture
  });
  const password = req.body.password;
  User.register(newUser, password, function(err, createdUser) {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/users/new");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", `Hello ${createdUser.username}!`);
      res.redirect(`/users/${req.user._id}`);
    });
  });
});

// SHOW
router.get("/users/:id", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if (err) {
      console.log(err);
      res.redirect("/posts");
    }
    Post.find({}).sort("-createdAt").where("author.id").equals(foundUser._id).exec(function(err, posts) {
      if (err) {
        console.log(err);
        res.redirect("/posts");
      }
      res.render("users/show", {user: foundUser, posts: posts});
    });
  });
});

// NEW - session
router.get("/sessions/new", function(req, res) {
  res.render("sessions/new");
});

// CREATE - session
router.post("/sessions", passport.authenticate("local", {
  failureRedirect: "/sessions/new",
  failureFlash: true
}), function(req, res) {
  req.flash("success", `Hello ${req.user.username}!`);
  res.redirect(`/users/${req.user._id}`);
});

// LOGOUT
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/posts");
});

module.exports = router;