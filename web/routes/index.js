const express = require("express");
const router = express.Router();
const path = require("path");

const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");

// In-memory user database (replace with a real database in production)
const users = [];

//****  home */

router.get("/", (req, res) => {
  const userId = req.session.userId ? req.session.userId : null;
  const isLoggedIn = userId ? true : false;

  res.render("home", {
    title: "SAU Todo-App",
    userId: userId,
    isLoggedIn: isLoggedIn,
    message: "Welcome to get work done!",
  });
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

  res.render("manageusers", {
    title: "Manage Users",
    description: "This is a Handlebars-based Express app.",
    users: data,
  });
});

const createUser = async (payload) => {
  fetch("http://localhost:8081/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Server response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const createTask = async (payload) => {
  fetch("http://localhost:8081/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Server response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const updateTask = async (payload) => {
  console.log("update task", payload);
  fetch("http://localhost:8081/api/tasks", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Server response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Route to handle the edit user submission
router.post("/updateuser/:id", async (req, res) => {
  console.log("update user");
  //  console.log(req.params.id);
  try {
    // call patch api
    const data = {
      id: req.params.id,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
    };
    console.log("payload", data);
    const response = await fetch("http://localhost:8081/api/users/", {
      method: "PATCH", // HTTP method
      headers: {
        "Content-Type": "application/json", // Send as JSON
      },
      body: JSON.stringify(data),
    });
    // redirect to userlist page
    console.log("send to user list page");
    res.redirect("/userslist");
  } catch (err) {
    console.error("edit user route", err);
    res.send(error);
  }
});

// Route to handle form submission
router.get("/edituserview/:id", async (req, res) => {
  console.log("Edit user view");

  try {
    console.log(req.params.id);

    const response = await fetch(
      "http://localhost:8081/api/users/" + req.params.id
    );
    const data = await response.json();

    // fetch user
    console.log("Edit Found", data);
    res.render("edituser", data);
  } catch (err) {
    console.error("edit user route", err);
    res.send(error);
  }
});

// Route to handle form submission
router.post("/adduser", async (req, res) => {
  try {
    console.log("add User Route /adduser");
    console.log("body", req.body);
    const { firstName, lastName, email } = req.body;
    const id = uuidv4().substring(0, 7); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    console.log("create user", id, firstName, lastName, email);
    const response = await createUser({
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    // todo check response
    res.render("welcome", { firstName: firstName });
  } catch (err) {
    console.error("adduser route", err);
    res.send(error);
  }
});

router.get("/adduser", async (req, res) => {
  console.log("add user user view");

  try {
    res.render("adduser", {});
  } catch (err) {
    console.error("add user route", err);
    res.send(error);
  }
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
    console.log("isAuthenticated");
    next();
  } else {
    res.status(401).send("Unauthorized");
    console.log("Not Authenticated");
    res.status(401).send("Unauthorized");
  }
}

// Login route
router.post("/login", async (req, res) => {
  console.log("login route");

  try {
    const { username, password } = req.body;
    console.log("username", username);
    console.log("password", password);

    // const user = users.find((user) => user.username === username);
    // console.assert
    const response = await fetch(
      "http://localhost:8081/api/users/email/" + username
    );
    const user = await response.json();
    console.log("user", user);

    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.pw);
    if (passwordMatch) {
      req.session.userId = username;
      console.log("users", users);
      res.render("home", {});
    } else {
      res.render("badcredentials", { msg: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.render("badcredentials", { msg: `Server Error ${error}` });
  }
});

// Registration route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  if (users.find((user) => user.username === username)) {
    return res.status(400).send("Username already exists");
  } else {
    console.log("user was registered", users);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    console.log("users", users);
    res.send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal server error");
  }
});

// Protected route (example)
router.get("/protected", isAuthenticated, (req, res) => {
  console.log("Protected", users);
  res.send(`Welcome, ${req.session.userId}! This is a protected route.`);
});

// Logout route
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      res.status(500).send("Internal server error");
    } else {
      res.send("Logged out successfully");
    }
  });
});

router.get("/login", (req, res) => {
  res.render("login", { username: "jdoe@doe.com", password: "goodgrief" });
});

router.get("/showsessions", (req, res) => {
  console.log("users", users);
  res.render("showsessions", { users: users });
});

router.get("/whoami", (req, res) => {
  const userId = req.session.userId ? req.session.userId : "no user id";
  console.log("whoami", userId);

  res.render("whoami", { userId: userId });
});

//****  register
router.get("/register", (req, res) => {
  res.render("register", {});
});

//****  addTask
router.get("/addtask", async (req, res) => {
  console.log("add task task view");
  const userId = req.session.userId ? req.session.userId : null;
  const isLoggedIn = userId ? true : false;
  const taskId = uuidv4();
  const payload = { user_id: userId, id: taskId };

  try {
    res.render("addtask", payload);
  } catch (err) {
    console.error("add task route", err);
    res.send(err);
  }
});

router.post("/addtask", async (req, res) => {
  const { id, user_id, title, description, tags } = req.body;

  console.log("addtask", id, user_id, title, description, tags);
  try {
    const completed = req.body.completed;
    const category_id = req.body.category_id;
    const status = await createTask({
      id: id,
      user_id: user_id,
      title: title,
      description: description,
      tags: tags,
      completed: false,
      category_id: "abc",
    });
    console.log("status", status);
    res.render("home", {});
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/viewtasks", async (req, res) => {
  // get the login user
  const response = await fetch("http://localhost:8081/api/tasks");
  const data = await response.json();
  res.render("viewtasks", {
    title: "View Tasks",
    tasks: data,
  });
});

router.get("/edittask/:id", async (req, res) => {
  // get the login user
  console.log("edittask", req.params.id);

  const response = await fetch(
    "http://localhost:8081/api/tasks/" + req.params.id
  );
  const data = await response.json();
  console.log("edit task", data);
  res.render("edittask", data);
});

router.post("/updatetask", async (req, res) => {
  const { id, user_id, title, description, tags } = req.body;

  console.log("updatetask", id, user_id, title, description, tags);
  try {
    const completed = req.body.completed;
    const category_id = req.body.category_id;
    const status = await updateTask({
      id: id,
      user_id: user_id,
      title: title,
      description: description,
      tags: tags,
      completed: true,
      category_id: category_id ? category_id : "",
    });
    console.log("status", status);
    const response = await fetch("http://localhost:8081/api/tasks");
    const data = await response.json();
    res.render("viewtasks", data);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
