var express = require('express');
var router = express.Router();
const path = require('path');

const { v4: uuidv4 } = require('uuid');


router.get("/", (req, res) => {
  res.render("home", { title: "Home Page", message: "Welcome to Handlebars!" });
});

 
 
router.get("/about", (req, res) => {
  res.render("about",
     { title: "About Us", description: "About", date :"Feb 12, 2025" });
});

 
router.get("/createaccount", (req, res) => {
  res.render("createaccount",
     { title: "Create Account", date :"Feb 12, 2025" });
});


 
router.get("/users", (req, res) => {
// Sample array of users
const users = [
  { firstName: 'Alice', lastName : "Smith", email: 'alice@example.com' },
  { firstName: 'Bob', lastName : "Doe", email: 'bob@example.com' },
  { firstName: 'Charlie', lastName : "Snipe", email: 'charlie@example.com' }
];

  res.render("users", { title: "About Us", description: "This is a Handlebars-based Express app.",
    users : users
   });
});
 
router.get("/userslist", async (req, res) => {
  // Sample array of users
  const users = [
    { firstName: 'Alice', lastName : "Smith", email: 'alice@example.com' },
    { firstName: 'Bob', lastName : "Doe", email: 'bob@example.com' },
    { firstName: 'Charlie', lastName : "Snipe", email: 'charlie@example.com' }
  ];

  const response = await fetch("http://localhost:8081/api/users");
  const data = await response.json();
  
    res.render("userslist", { title: "About Us", description: "This is a Handlebars-based Express app.",
      users : data
     });
  });

  const createUser = async (payload)=> {

    fetch('http://localhost:8081/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      console.log('Server response:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });



  }



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





module.exports = router;
