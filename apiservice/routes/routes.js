import { Router } from 'express';
const router = Router();

const DBNAME = "./test.db";

let db = global.db;
 

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
           due_date, completed, date_completed, category_id, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    row,
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
      return {
        err: error,
        ok: false,
      };
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
async function getTaskById(db, id) {
  console.log("get task", id);
  const rows = await db.get("SELECT * FROM tasks WHERE id = ?", [id]);
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


async function openDb() {
  const db = await open({
    filename: DBNAME, // Database file
    driver: sqlite3.Database, // Driver to use from sqlite3
  });
  return db;
}


// ***************  Define Routes  *********************

router.get("/about", (req, res) => {
  const td = new Date();
  console.log("About was called", td);
  res.send(`about ${td}`);
});

router.get("/aboutchris", (req, res) => {
  const td = new Date();
  console.log("About Chris was called", req);
  res.send(`about Christ ${td}`);
});

router.get("/aboutweather", (req, res) => {
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
router.get("/", function (req, res) {
  console.log("req");
  const td = new Date();
  res.send("Hello world at abc" + td);
});

// get one user  (R=CRUD)
router.get("/api/users/:id", async function (req, res) {
  console.log("get a users by id");
  console.log(req.params.id);
  const users = await getOne(db, req.params.id);
  console.log("get--> /api/users", users);
  res.json(users);
});

// get one user  (R=CRUD)
router.get("/api/users/email/:id", async function (req, res) {
  console.log("get a users by email");
  console.log(req.params.id);
  const users = await findUsersByEmail(db, req.params.id);
  console.log("get--> /api/users/email", users);
  res.json(users);
});

router.get("/api/tasks", async function (req, res) {
  const tasks = await getAllTasks(db);
  console.log("get--> /api/task", tasks);
  res.json(tasks);
});

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: users (R=CRUD)
 *     responses:
 *       200:
 *         description: Returns all users
 */

// get all users (R = CRUD)
router.get("/api/users", async function (req, res) {
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
router.post("/api/users", async function (req, res) {
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
router.put("/api/users", async function (req, res) {
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
router.patch("/api/users", async function (req, res) {
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

// get one task  (R=CRUD)
router.get("/api/tasks/:id", async function (req, res) {
  console.log("get a task by id");
  console.log(req.params.id);
  const tasks = await getTaskById(db, req.params.id);
  console.log("get--> /api/tasks", tasks);
  res.json(tasks);
});

// create one tasks (C = CRUD)
router.post("/api/tasks", async function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,POST");
  res.set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  console.log("post: body", req.body);

  const id = req.body.id.toString();
  const user_id = req.body.user_id;
  const title = req.body.title;
  const description = req.body.description;
  // auto create
  const updated_at = new Date().toString();
  const created_at = new Date().toString();
  const completed = req.body.completed;
  const category_id = req.body.category_id;
  const tags = req.body.tags;

  let objArr = [
    id,
    user_id,
    title,
    description,
    created_at,
    updated_at,
    "",
    completed,
    "",
    category_id,
    tags,
  ];
  console.log("update tags", objArr);
  const status = await insertTask(db, objArr);
  if (status.changes) {
    console.log("task insert completed", status);
    return res.json({ status: true });
  }
  res.json({ status: false });
});

// update one task (U = CRUD)
router.put("/api/tasks", async function (req, res) {
  console.log("put: tasks", req.body);
  const id = req.body.id.toString();
  const user_id = req.body.user_id;
  const title = req.body.title;
  const description = req.body.description;
  const update_at = new Date();
  const completed = req.body.completed;
  const category_id = req.body.category_id ? req.body.category_id : "";
  const tags = req.body.tags ? req.body.tags : "";

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
  console.log("update task", obj);
  const result = await db.run(
    "UPDATE tasks SET user_id = ?, title = ?, description = ?, update_at = ?, completed = ?, category_id = ?, tags = ? WHERE id = ?",
    obj
  );
  console.log("update completed");
  res.json(result);
});

// Delete one  task
router.delete("/api/tasks/:id", async function (req, res) {
  console.log("delete tasks", req.params.id);
  const id = req.params.id;
  const result = await db.run("DELETE from tasks WHERE id = ?", [id]);
  console.log("Delete:", result);
  res.json(result);
});

// Delete one  user
router.delete("/api/users/:id", async function (req, res) {
  console.log(req.params.id);
  const id = req.params.id;
  const result = await db.run("DELETE from users WHERE id = ?", [id]);
  console.log("Delete:", result);

  res.json(result);
});

// global
// const db = createDbConnection();
router.get("/api/init", function (req, res) {
  console.log("req");
  const td = new Date();
  res.send("app Init" + td);
});


export default router;