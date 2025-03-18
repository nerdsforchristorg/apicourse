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

async function createTasksTable(db) {
<<<<<<< HEAD
  console.log("create Tasks table");
  return db.exec(`
=======
    console.log("create Tasks table");
    return db.exec(`
>>>>>>> d712d4735695525915a3e09b946599da98c91c8c
  CREATE TABLE tasks
  (
    id  VARCHAR(10) NOT NULL,
    user_id   VARCHAR(50) NOT NULL,
<<<<<<< HEAD
    title    VARCHAR(50) NOT NULL,
    description  VARCHAR(500) NOT NULL,
    created_at TEXT,
    updated_at TEXT,
    due_date TEXT,
    completed BOOLEAN,
    date_completed TEXT,
    category_id VARCHAR(10),
    tags TEXT

=======
    title   VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    created_at  TEXT,
    updated_at  TEXT,
    due_date TEXT,
    completed  BOOLEAN,
    date_completed TEXT,
    category_id VARCHAR(10),
    tags TEXT
>>>>>>> d712d4735695525915a3e09b946599da98c91c8c
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

async function insertTask(db,row) {
       console.log("InsertRow Task",row);
       return db.run(
           `INSERT INTO tasks (id, user_id, title, 
           description, created_at, updated_at,
           due_date, completed, category_id, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
<<<<<<< HEAD
  console.log("Get all");
  const db = createDbConnection();
  db.all(`SELECT * FROM users`, (error, rows) => {
    if (error) {
      throw new Error(error.message);
    }
    console.log("getAllExit,----:", rows);
    return rows;
  });
}

function getAllTasks() {
  console.log("Get all Tasks");
  const db = createDbConnection();
  db.all(`SELECT * FROM users`, (error, rows) => {
    if (error) {
      throw new Error(error.message);
    }
    console.log("getAllExit,----:", rows);
    return rows;
  });
}
=======
 console.log("get all");
 const db = createDbConnection();   
     db.all(
        `SELECT * FROM users`, (error, rows) => {
            if (error) {
                throw new Error(error.message);
            }
            console.log("getAllExit,----:",rows);
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
   


>>>>>>> d712d4735695525915a3e09b946599da98c91c8c

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

<<<<<<< HEAD
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
=======

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
         const rows = await db.all('SELECT * FROM tasks');
         //console.log('All Users:', rows);
         return rows;
 } 
 

async function getOne(db,id) {
    const result = await db.get('SELECT * FROM users WHERE id = ?', id)
    return result;
}


async function getOneTask(db,id) {
    const result = await db.get('SELECT * FROM tasks WHERE id = ?', id)
    return result;
}

async function initToDoTable() {
    console.log("Seed todo table");
    db = await createDbConnection();
   // await createTasksTable(db);
   let obj1 = ["1", "1", "Practice 3 Points", "Coach asked me to improve my score",
      "03/10/2025", "03/10/2025", "03/15/2025",
      false,
      "basketball",
      "improvement"
    ];
    await insertTask(db, obj1);
>>>>>>> d712d4735695525915a3e09b946599da98c91c8c
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
<<<<<<< HEAD
  // db the shared db variable for the database instance
  console.log("bootapp");
  if (fs.existsSync(DBNAME)) {
    console.log("SQLite database exists.");
=======

// db the shared db variable for the database instance
console.log("bootapp");
await initToDoTable();

if (fs.existsSync(DBNAME)) {
    console.log('SQLite database exists.');
>>>>>>> d712d4735695525915a3e09b946599da98c91c8c
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

app.get('/api/tasks',  async function (req, res) {
    const tasks = await getAllTasks(db);
    console.log('get--> /api/task',tasks);
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
<<<<<<< HEAD
app.patch("/api/users", async function (req, res) {
  console.log("patch: body", req.body);
  const id = req.body.id.toString();
  const email = req.body.email;
=======
app.patch('/api/users', async function (req, res) {
    console.log("patch: body", req.body);
    const id = req.body.id.toString();
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    let obj = [firstName,lastName,email,id];
    console.log("update database",obj);
    const result = await db.run(
        'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?',
        obj
    )
    res.json(result);
})

// get one user  (R=CRUD)
app.get('/api/tasks/:id',  async function (req, res) {
    console.log("get a task by id");
    console.log(req.params.id);
    const users = await getTask(db,req.params.id);
    console.log('get--> /api/users',users);
    res.json(users);
})



// create one tasks (C = CRUD)
app.post('/api/tasks', async function (req, res) {

    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
    console.log("post: body", req.body);

    const id = req.body.id.toString();
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const update_at = new Date();
    const created_at = new Date();
    const completed = req.body.completed;
    const category_id= req.body.category_id;
    const tags = req.body.tags;

    let obj = [user_id,title,description,created_at,completed,category_id,tags,id];
    console.log("update tags",obj);
    const result = await db.run(
        'UPDATE tasks SET user_id = ?, title = ?, description = ?, crated_at = ?, completed = ?, category_id = ?, tags = ? WHERE id = ?',
        obj
    )
    res.json(result);

})




// update one user (U = CRUD)
app.put('/api/tasks', async function (req, res) {
    console.log("put: tasks", req.body);
    const id = req.body.id.toString();
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const update_at = new Date();
    const completed = req.body.completed;
    const category_id= req.body.category_id;
    const tags = req.body.tags;

    let obj = [user_id,title,description,update_at,completed,category_id,tags,id];
    console.log("update tags",obj);
    const result = await db.run(
        'UPDATE tasks SET user_id = ?, title = ?, description = ?, update_at = ?, completed = ?, category_id = ?, tags = ? WHERE id = ?',
        obj
    )
    res.json(result);
})



// Delete one  task
app.delete('/api/tasks/:id', async function (req, res) {
    console.log('delete tasks',req.params.id);
    const id =  req.params.id;
    const result = await db.run(
        'DELETE from tasks WHERE id = ?',
        [id]
    )
    console.log("Delete:",result);
    res.json(result);
})




>>>>>>> d712d4735695525915a3e09b946599da98c91c8c

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
