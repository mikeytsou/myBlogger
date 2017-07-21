const express = require("express");
      router = express.Router();
      path = require("path");
// MODELS
      Post = require("../models/post");

// ROOT
router.get("/", function(req, res) {
  res.redirect("/posts");
});

// INDEX
router.get("/posts", function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render("posts/index", {posts: posts});
    }
  });
});

// NEW
router.get("/posts/new", function(req, res) {
  res.render("posts/new");
});

// CREATE
router.post("/posts", function(req, res) {
  req.body.entry.body = req.sanitize(req.body.entry.body);
  Post.create(req.body.entry, function(err, newPost) {
    if (err) {
      console.log(err);
      res.redirect("/posts/new");
    } else {
      console.log(newPost);
      res.redirect("/posts");
    }
  });
});

module.exports = router;