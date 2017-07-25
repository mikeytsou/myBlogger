const express = require("express");
      path = require("path");
      middleware = require("../middleware/index");
      router = express.Router();
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
router.post("/posts", middleware.isLoggedIn, function(req, res) {
  // req.body.post.image = req.sanitize(req.body.post.image);
  // req.body.post.title = req.sanitize(req.body.post.title);
  // req.body.post.description = req.sanitize(req.body.post.description);
  // req.body.post.body = req.sanitize(req.body.post.body);
  const image = req.body.post.image;
  const title = req.body.post.title;
  const description = req.body.post.description;
  const body = req.body.post.body;
  const author = {
    id: req.user._id,
    username: req.user.username
  }
  const newPost = {
    image: image,
    title: title,
    description: description,
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

// SHOW
router.get("/posts/:id", function(req, res) {
  Post.findById(req.params.id).populate("comments").exec(function(err, foundPost) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.render("posts/show", {post: foundPost});
    }
  });
});

// EDIT
router.get("/posts/:id/edit", middleware.isLoggedIn, function(req, res) {
  Post.findById(req.params.id, function(err, foundPost) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.render("posts/edit", {post: foundPost});
    }
  });
});

// UPDATE
router.put("/posts/:id", function(req, res) {
  // req.body.post.image = req.sanitize(req.body.post.image);
  // req.body.post.title = req.sanitize(req.body.post.title);
  // req.body.post.description = req.sanitize(req.body.post.description);
  // req.body.post.body = req.sanitize(req.body.post.body);
  Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatePost) {
    if (err) {
      console.log(err);
      res.redirect(`/posts/${req.params.id}`);
    } else {
      console.log(updatePost);
      res.redirect(`/posts/${req.params.id}`);
    }
  });
});


// DESTROY
router.delete("/posts/:id", middleware.isLoggedIn, function(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;