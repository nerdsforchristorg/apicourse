import express from "express";
const app = express();
app.use(express.json());
// const sqlite3 = iimporire("sqlite3").verbose();
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const DBNAME = "./test.db";

import fs from "fs";

let db = null;

async function createUserTable(db) {
  console.log("createUserTable function");
  return db.exec(`
  CREATE TABLE users
  (
    id  VARCHAR(10) NOT NULL,
    firstName   VARCHAR(50) NOT NULL,
    lastName   VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
    );
`);
}

async function createToDoTable(db) {
  console.log("create ToDo table");
  return db.exec(`
  CREATE TABLE tasks
  (
    id  VARCHAR(10) NOT NULL,
    user_id   VARCHAR(50) NOT NULL,
    title    VARCHAR(50) NOT NULL,
    description  VARCHAR(500) NOT NULL,
    created_at TEXT,
    updated_at TEXT,
    due_date TEXT,
    completed BOOLEAN,
    date_completed TEXT,
    category_id VARCHAR(10),
    tags TEXT

    );
`);
}

async function insertRow(db, row) {
  //   const [name, color, weight] = process.argv.slice(2);
  console.log("InsertRow");
  return db.run(
    `INSERT INTO users (id, firstName, lastName, email) VALUES (?, ?, ?, ?)`,
    row,
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
  );
}

async function insertTask(db, row) {
  //   const [name, color, weight] = process.argv.slice(2);
  console.log("InsertRow Task");
  return db.run(
    `INSERT INTO tasks (id, user_id, title, description, created_at, updated_at, due_date, completed, category, tags, firstName, lastName, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    row,
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
  );
}

function getAll() {
  console.log("Git all");
  const db = createDbConnection();
  db.all(`SELECT * FROM users`, (error, rows) => {
    if (error) {
      throw new Error(error.message);
    }
    console.log("getAllExit,----:", rows);
    return rows;
  });
}

function getAll() {
  console.log("Git all");
  const db = createDbConnection();
  db.all(`SELECT * FROM users`, (error, rows) => {
    if (error) {
      throw new Error(error.message);
    }
    console.log("getAllExit,----:", rows);
    return rows;
  });
}

async function getAllUsers(db) {
  console.log("get All Users");
  // Query all users
  const rows = await db.all("SELECT * FROM users");
  //console.log('All Users:', rows);
  return rows;
}

async function findUsersByFirstName(db, name) {
  console.log("find Users", name);
  const rows = await db.get("SELECT * FROM users WHERE firstName = ?", [name]);
  return rows;
}

async function findUsersByLastName(db, name) {
  console.log("find Users", name);
  const rows = await db.get("SELECT * FROM users WHERE lastName = ?", [name]);
  return rows;
}

async function findUsersByName(db, firstName, lastName) {
  console.log("find Users", name);
  const rows = await db.get(
    "SELECT * FROM users WHERE firstName = ? and lastName= ?",
    [firstName, lastName]
  );
  return rows;
}

async function createDbConnection() {
  const db = await open({
    filename: DBNAME, // Database file
    driver: sqlite3.Database, // Driver to use from sqlite3
  });
  return db;
}

async function getOne(db, id) {
  const result = await db.get("SELECT * FROM users WHERE id = ?", id);
  return result;
}

async function initToDoTable() {}

async function initDb() {
  console.log("Test API App Starting");
  console.log("create db connection");
  db = await createDbConnection();

  console.log("create User Table");

  await createUserTable(db);
  let obj1 = ["1", "John", "Doe", "jdoe@doe.com"];
  let obj2 = ["2", "Fred", "Smith", "fs@smith.com"];
  let obj3 = ["3", "Steve", "Gamer", "steve@gamer.com"];
  let obj4 = ["4", "Good", "Will", "good@will.com"];

  await insertRow(db, obj1);
  await insertRow(db, obj2);
  await insertRow(db, obj3);
  await insertRow(db, obj4);

  return db;
}

async function openDb() {
  const db = await open({
    filename: DBNAME, // Database file
    driver: sqlite3.Database, // Driver to use from sqlite3
  });
  return db;
}

async function bootApp() {
  // db the shared db variable for the database instance
  console.log("bootapp");
  if (fs.existsSync(DBNAME)) {
    console.log("SQLite database exists.");
    const db = await openDb();
    //console.log("db2",db);
    return db;
  } else {
    console.log("SQLite database does not exist.");
    return await initDb();
  }
}

// ***************  Define Routes  *********************

app.get("/about", (req, res) => {
  const td = new Date();
  console.log("About was called", td);
  res.send(`about ${td}`);
});

app.get("/aboutchris", (req, res) => {
  const td = new Date();
  console.log("About Chris was called", req);
  res.send(`about Christ ${td}`);
});

app.get("/aboutweather", (req, res) => {
  const td = new Date();
  console.log("About Weather", req);

  const payload = [
    {
      date: td,
      location: "SAU",
      timeZone: "Eastern",
      zip: 49023,
      state: "MI",
      phoneNumbers: ["517", "521"],
    },
    {
      date: td,
      location: "SAU",
      timeZone: "Eastern",
      zip: 49023,
      state: "MI",
      phoneNumbers: ["517", "521"],
    },
  ];

  res.json(payload);
});

// Root Web
app.get("/", function (req, res) {
  console.log("req");
  const td = new Date();
  res.send("Hello world at abc" + td);
});

// get one user  (R=CRUD)
app.get("/api/users/:id", async function (req, res) {
  console.log("get a users by id");
  console.log(req.params.id);
  const users = await getOne(db, req.params.id);
  console.log("get--> /api/users", users);
  res.json(users);
});

// get all users (R = CRUD)
app.get("/api/users", async function (req, res) {
  const query = req.query;
  if (query.firstname && query.lastName) {
    console.log("Full Name search", query);
    const users = await findUsersByName(db, query.firstname, query.lastName);
    res.json(users);
  } else if (query.firstname) {
    console.log("First Name search", query);
    const users = await findUsersByFirstName(db, query.firstname);
    res.json(users);
  } else if (query.lastname) {
    console.log("Last Name search", query);
    const users = await findUsersByLastName(db, query.lastname);
    res.json(users);
  } else {
    console.log("get all users");
    console.log(req.params);
    const users = await getAllUsers(db);
    console.log("get--> /api/users", users);
    res.json(users);
  }
});

// create one user (C = CRUD)
app.post("/api/users", async function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,POST");
  res.set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  console.log("post: body", req.body);
  const id = req.body.id.toString();
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  let obj = [id, firstName, lastName, email];
  const result = await db.run(
    "INSERT INTO users (id, firstName, lastName, email) VALUES (?,?,?,?)",
    obj
  );

  res.json(result);
});

// update one user (U = CRUD)
app.put("/api/users", async function (req, res) {
  console.log("put: body", req.body);
  const id = req.body.id.toString();
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  let obj = [firstName, lastName, email, id];
  console.log("update database", obj);
  const result = await db.run(
    "UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?",
    obj
  );
  res.json(result);
});

// update partial user (U = CRUD)
app.patch("/api/users", async function (req, res) {
  console.log("patch: body", req.body);
  const id = req.body.id.toString();
  const email = req.body.email;

  let obj = [email, id];
  console.log("update database", obj);
  const result = await db.run("UPDATE users SET email = ? WHERE id = ?", obj);
  res.json(result);
});

// Delete one  user
app.delete("/api/users/:id", async function (req, res) {
  console.log(req.params.id);
  const id = req.params.id;
  const result = await db.run("DELETE from users WHERE id = ?", [id]);
  console.log("Delete:", result);

  res.json(result);
});

// global
// const db = createDbConnection();
app.get("/api/init", function (req, res) {
  console.log("req");
  const td = new Date();
  res.send("app Init" + td);
});

// ***************  App Starts Here   *********************

db = await bootApp();
console.log("Db", db);

// test db connection
// const users = await getAllUsers(db);
// console.log('get--> /api/users',users);

const server = app.listen(8081, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
