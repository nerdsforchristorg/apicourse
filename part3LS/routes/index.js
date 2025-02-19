var express = require("express");
var router = express.Router();
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", date: "Feb 5th, 2025" });
});

router.get("/test", function (req, res, next) {
  res.render("test", { title: "Test Page" });
});

router.get("/about", function (req, res, next) {
  let dir = __dirname.replace("routes", ""); // Remove Routes
  console.log("dir", dir);
  res.sendFile(path.join(dir, "public", "about.html"));
});

module.exports = router;
