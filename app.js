const express = require("express");
      mongoose = require("mongoose");
      bodyParser = require("body-parser");
      methodOverride = require("method-override");
      expressSanitizer = require("express-sanitizer");
      app = express();
// ROUTES
      postRoutes = require("./routes/posts");

// APP CONFIG
mongoose.connect("mongodb://localhost/my_blogger");
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.set("view engine", "ejs");

// ROUTES
app.use(postRoutes);

// MISSING ROUTE
app.get("*", function(req, res) {
  res.send("PAGE NOT FOUND");
});

// SERVER
app.listen(3000, function() {
  console.log("CONNECTED TO PORT 3000");
});