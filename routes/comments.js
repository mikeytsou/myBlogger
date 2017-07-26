const express = require("express");
      middleware = require("../middleware/index");
      router = express.Router();
// MODELS
      Comment = require("../models/comment");
      Post = require("../models/post");

// CREATE
router.post("/posts/:id/comments", middleware.isLoggedIn, function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
          req.flash("error", "Comment text is required");
          res.redirect(`/posts/${post._id}`);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.author.picture = req.user.picture;
          comment.save();
          post.comments.push(comment);
          post.save();
          console.log(comment);
          res.redirect(`/posts/${post._id}`);
        }
      });
    }
  });
});

module.exports = router;