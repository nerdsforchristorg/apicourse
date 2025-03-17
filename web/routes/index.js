var express = require("express");
var router = express.Router();
const path = require("path");

const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  res.render("home", { title: "Home Page", message: "Welcome to Handlebars!" });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    description: "About",
    date: "Feb 12, 2025",
  });
});

router.get("/createaccount", (req, res) => {
  res.render("createaccount", {
    title: "Create Account",
    date: "Feb 12, 2025",
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
<<<<<<< HEAD

  res.render("manageusers", {
    title: "manage",
    description: "This is a Handlebars-based Express app.",
    users: data,
=======
  
    res.render("manageusers", { title: "Manage Users", description: "This is a Handlebars-based Express app.",
      users : data
     });
>>>>>>> 3e124e5dee414e9e162b9bfffb2cf1539ea6a0a7
  });
});

const createUser = async (payload) => {
  fetch("http://localhost:3000/api/apiusers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => console.log("Response from server:", data))
    .catch((error) => console.error("Error:", error));
};

// Route to handle form submission
router.post("/adduser", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const id = uuidv4().substring(0, 7); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    console.log("create user", id, firstName, lastName, email);
    const response = await createUser({
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    //todo check response
    res.render("welcome", { firstName: firstName });
  } catch (err) {
    console.error("adduser route", err);
    res.send(error);
  }
});

router.patch("/edituser", async (req, res) => {
  try {
    console.log("Edit User");
    console.log("body", req.body);
    res.render("manageuser");
  } catch (err) {
    console.error("edit user route", err);
    res.send(error);
  }
});

<<<<<<< HEAD
router.get("/edituserview", async (req, res) => {
  try {
    console.log("Edit User View");
    console.log("body", req.body);
    res.render("edituser");
  } catch (err) {
    console.error("edit user route", err);
    res.send(error);
  }
});
=======

  // Route to handle the edit user submission
  router.patch('/edituser', async (req, res) => {
    try {
      console.log("Edit user");
      console.log("body",req.body);
         res.render('manageusers');
    } catch(err) {
      console.error("edit user route",err);
      res.send(error);
    }

    });

     // Route to handle form submission
  router.get('/edituserview', async (req, res) => {
    try {
      console.log("Edit user view");
      //console.log(req.params.id);
      console.log("body",req.body);
         res.render('edituser');
    } catch(err) {
      console.error("edit user route",err);
      res.send(error);
    }

    });
 





  // Route to handle form submission
 router.post('/adduser', async (req, res) => {
    try {
      console.log("add User Route /adduser");
      console.log("body",req.body);
      const { firstName, lastName,email} = req.body;
      const id = uuidv4().substring(0,7); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
      console.log("create user",id,firstName,lastName,email);
      const response = await createUser({id : id, firstName : firstName, lastName : lastName, email : email });
      // todo check response 
      res.render('welcome',{firstName :firstName});
    } catch(err) {
      console.error("adduser route",err);
      res.send(error);
    }

    });




>>>>>>> 3e124e5dee414e9e162b9bfffb2cf1539ea6a0a7

module.exports = router;
