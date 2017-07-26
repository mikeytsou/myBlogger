const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Must be logged in");
  res.redirect("/posts");
}

middlewareObj.checkPostOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Post.findById(req.params.id, function(err, foundPost) {
      if (err) {
        req.flash("error", "Post not found");
        res.redirect("back");
      } else {
        console.log(foundPost.author.id); // this is not a string, its a mongoose objectID that looks like a string
        console.log(req.user._id); // this is a string so both dont compare with ===
        if (foundPost.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "Permission not granted");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Must be logged in");
    res.redirect("back");
  }
}

module.exports = middlewareObj;