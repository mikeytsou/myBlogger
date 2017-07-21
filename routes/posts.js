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
  req.body.post.image = req.sanitize(req.body.post.image);
  req.body.post.title = req.sanitize(req.body.post.title);
  req.body.post.body = req.sanitize(req.body.post.body);
  const image = req.body.post.image;
  const title = req.body.post.title;
  const body = req.body.post.body;
  const author = {
    id: req.user._id,
    username: req.user.username
  }
  const newPost = {
    image: image,
    title: title,
    body: body,
    author: author
  }
  Post.create(newPost, function(err, createdPost) {
    if (err) {
      console.log(err);
      res.redirect("/posts/new");
    } else {
      console.log(newPost);
      res.redirect("/");
    }
  });
});

// EDIT
router.get("/posts/:id/edit", function(req, res) {
  Post.findById(req.params.id, function(err, foundPost) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.render("posts/edit", {post: foundPost});
    }
  });
});

module.exports = router;