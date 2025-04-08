import express from "express";
const app = express();
app.use(express.json());
// const sqlite3 = iimporire("sqlite3").verbose();
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";

const DBNAME = "./test.db";

import fs from "fs";

let db = null;

async function createUserTable(db) {
  console.log("createUserTable function");
  return db.exec(`
  CREATE TABLE users
  (
    id  VARCHAR(60) NOT NULL,
    firstName   VARCHAR(50) NOT NULL,
    lastName   VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    pw VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL,
    imageURL VARCHAR(50) 
    );
`);
}

async function createTasksTable(db) {
  console.log("create Tasks table");
  return db.exec(`
  CREATE TABLE tasks
  (
    id  VARCHAR(60) NOT NULL,
    user_id   VARCHAR(50) NOT NULL,
    title   VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    created_at  TEXT,
    updated_at  TEXT,
    due_date TEXT,
    completed  BOOLEAN,
    date_completed TEXT,
    category_id VARCHAR(10),
    tags TEXT
    );
`);
}

async function tableCheck(db, tableName) {
  console.log("table check", tableName);
  return db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
    [tableName],
    (err, row) => {
      if (err) {
        console.error(err.message);
        return false;
      } else {
        if (row) {
          console.log(`Table "${tableName}" exists.`);
          return true;
        } else {
          console.log(`Table "${tableName}" does not exist.`);
          return false;
        }
      }
    }
  );
}

async function insertRow(db, row) {
  //   const [name, color, weight] = process.argv.slice(2);
  console.log("InsertRow");
  return db.run(
    `INSERT INTO users (id, firstName, lastName, email, pw, role) VALUES (?, ?, ?, ?,?,?)`,
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
  console.log("InsertRow Task", row);
  return db.run(
    `INSERT INTO tasks (id, user_id, title, 
           description, created_at, updated_at,
           due_date, completed, date_completed, category_id, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?)`,
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
  console.log("get all");
  const db = createDbConnection();
  db.all(`SELECT * FROM users`, (error, rows) => {
    if (error) {
      throw new Error(error.message);
    }
    console.log("getAllExit,----:", rows);
    return rows;
  });
}

// function getAllTasks() {
//     console.log("Get All Tasks");
//     const db = createDbConnection();
//         db.all(
//            `SELECT * FROM tasks`, (error, rows) => {
//                if (error) {
//                    throw new Error(error.message);
//                }
//                console.log("getAllExit,----:",rows);
//                return rows;
//            });
//    }

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

async function findUsersByEmail(db, email) {
  console.log("find Users By Email", email);
  const rows = await db.get("SELECT * FROM users WHERE email = ?", [email]);
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

async function getAllTasks(db) {
  console.log("get All Tasks");
  // Query all users
  const rows = await db.all("SELECT * FROM tasks");
  //console.log('All Users:', rows);
  return rows;
}

async function getOne(db, id) {
  const result = await db.get("SELECT * FROM users WHERE id = ?", id);
  return result;
}

async function getOneTask(db, id) {
  const result = await db.get("SELECT * FROM tasks WHERE id = ?", id);
  return result;
}

async function tableExist(tableName) {
  db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
    [tableName],
    (err, row) => {
      if (err) {
        console.error(err.message);
      }
      if (row) {
        console.log(`Table "${tableName}" exists.`);
        return true;
      } else {
        console.log(`Table "${tableName}" does not exist.`);
        return false;
      }
    }
  );

  db.close();
}

async function initToDoTable() {
  console.log("Seed todo table");
  const _db = await createDbConnection();
  const check = await tableCheck(_db, "tasks");
  if (check) {
    return;
  }
  await createTasksTable(_db);
  let obj1 = [
    "1",
    "1",
    "Practice 3 Points",
    "Coach asked me to improve my score",
    "03/10/2025",
    "03/10/2025",
    "03/15/2025",
    false,
    "",
    "basketball",
    "improvement",
  ];
  await insertTask(_db, obj1);
}

async function initUserTable() {
  console.log("InitUserTable");
  const _db = await createDbConnection();

  const check = await tableCheck(_db, "users");
  if (check) {
    return;
  }

  await createUserTable(_db);
  let obj1 = ["1", "John", "Doe", "jdoe@doe.com", "goodgrief", "admin"];
  let obj2 = ["2", "Fred", "Smith", "fs@smith.com", "goodgrief", "user"];
  let obj3 = ["3", "Steve", "Gamer", "steve@gamer.com", "goodgrief", "user"];
  let obj4 = ["4", "Good", "Will", "good@will.com", "goodgrief", "user"];

  obj1[4] = await bcrypt.hash(obj1[4], 10);
  await insertRow(_db, obj1);

  obj2[4] = await bcrypt.hash(obj2[4], 10);
  await insertRow(_db, obj2);

  obj3[4] = await bcrypt.hash(obj3[4], 10);
  await insertRow(_db, obj3);

  obj4[4] = await bcrypt.hash(obj4[4], 10);
  await insertRow(_db, obj4);

  return _db;
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
    await initToDoTable();
    await initUserTable();
    //console.log("db2",db);
    return db;
  } else {
    console.log("SQLite database does not exist.");
    await initToDoTable();
    await initUserTable();
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

// get one user  (R=CRUD)
app.get("/api/users/email/:id", async function (req, res) {
  console.log("get a users by email");
  console.log(req.params.id);
  const users = await findUsersByEmail(db, req.params.id);
  console.log("get--> /api/users/email", users);
  res.json(users);
});

app.get("/api/tasks", async function (req, res) {
  const tasks = await getAllTasks(db);
  console.log("get--> /api/task", tasks);
  res.json(tasks);
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
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  let obj = [firstName, lastName, email, id];
  console.log("update database", obj);
  const result = await db.run(
    "UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?",
    obj
  );
  res.json(result);
});

// get one user  (R=CRUD)
app.get("/api/tasks/:id", async function (req, res) {
  console.log("get a task by id");
  console.log(req.params.id);
  const users = await getTask(db, req.params.id);
  console.log("get--> /api/users", users);
  res.json(users);
});

// create one tasks (C = CRUD)
app.post("/api/tasks", async function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,POST");
  res.set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  console.log("post: body", req.body);

  const id = req.body.id.toString();
  const user_id = req.body.user_id;
  const title = req.body.title;
  const description = req.body.description;
  // auto create
  const update_at = new Date();
  const created_at = new Date();
  const completed = req.body.completed;
  const category_id = req.body.category_id;
  const tags = req.body.tags;

  let obj = [
    user_id,
    title,
    description,
    created_at,
    completed,
    category_id,
    tags,
    id,
  ];
  console.log("update tags", obj);
  const result = await db.run(
    "UPDATE tasks SET user_id = ?, title = ?, description = ?, created_at = ?, completed = ?, category_id = ?, tags = ? WHERE id = ?",
    obj
  );
  res.json(result);
});

// update one user (U = CRUD)
app.put("/api/tasks", async function (req, res) {
  console.log("put: tasks", req.body);
  const id = req.body.id.toString();
  const user_id = req.body.user_id;
  const title = req.body.title;
  const description = req.body.description;
  const update_at = new Date();
  const completed = req.body.completed;
  const category_id = req.body.category_id;
  const tags = req.body.tags;

  let obj = [
    user_id,
    title,
    description,
    update_at,
    completed,
    category_id,
    tags,
    id,
  ];
  console.log("update tags", obj);
  const result = await db.run(
    "UPDATE tasks SET user_id = ?, title = ?, description = ?, update_at = ?, completed = ?, category_id = ?, tags = ? WHERE id = ?",
    obj
  );
  res.json(result);
});

// Delete one  task
app.delete("/api/tasks/:id", async function (req, res) {
  console.log("delete tasks", req.params.id);
  const id = req.params.id;
  const result = await db.run("DELETE from tasks WHERE id = ?", [id]);
  console.log("Delete:", result);
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
