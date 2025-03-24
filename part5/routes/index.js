var express = require("express");
var router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.render("home", { title: "Home Page", message: "Welcome to Handlebars!" });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    description: "This is a Handlebars-based Express app.",
  });
});

router.get("/users", (req, res) => {
  // Sample array of users
  const users = [
    { firstName: "Alice", lastName: "Smith", email: "alice@example.com" },
    { firstName: "Bob", lastName: "Doe", email: "bob@example.com" },
    { firstName: "Charlie", lastName: "Snipe", email: "charlie@example.com" },
  ];

  res.render("users", {
    title: "About Us",
    description: "This is a Handlebars-based Express app.",
    users: users,
  });
});

router.get("/userslist", async (req, res) => {
  // Sample array of users
  const users = [
    { firstName: "Alice", lastName: "Smith", email: "alice@example.com" },
    { firstName: "Bob", lastName: "Doe", email: "bob@example.com" },
    { firstName: "Charlie", lastName: "Snipe", email: "charlie@example.com" },
  ];

  const response = await fetch("http://localhost:8081/api/users");
  const data = await response.json();

  res.render("userslist", {
    title: "About Us",
    description: "This is a Handlebars-based Express app.",
    users: data,
  });
});

module.exports = router;
