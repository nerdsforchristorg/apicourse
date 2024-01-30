import  express from 'express';
const app = express();
app.use(express.json())
// const sqlite3 = iimporire("sqlite3").verbose();
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

const DBNAME = "./test.db";



async function createDbConnection() {
    return new sqlite3.Database(DBNAME, (error) => {
        if (error) {
            return console.error(error.message);
        }
    });
 //   console.log("Connection with SQLite has been established");
   // return db;
}

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

async function insertRow(db,row) {
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


function getAll(db) {

     db.all(
        `SELECT * FROM users`, (error, rows) => {
            if (error) {
                throw new Error(error.message);
            }
            console.log("getAllExit,----:",rows);
            return rows;
        });

}


async function getAll2(db) {
    const result = await db.all( `SELECT * FROM users`);
    return result;
}

async function getOne(db,id) {
    const result = await db.get('SELECT * FROM users WHERE id = ?', id)
    return result;
}





// ***  App Starts Here
let  db = null;
const init = false;

if (init) {
    (async function () {

        console.log("Test API App Starting");
        console.log("create db connection");
        db = await createDbConnection();
        console.log("create User Table");

        await createUserTable(db);
        let obj1 = ["1", "John", "Doe", "jdoe@doe.com"];
        let obj2 = ["1", "Fred", "Smith", "fs@smith.com"];
        let obj3 = ["2", "Steve", "Gamer", "steve@gamer.com"];

        await insertRow(db, obj1);
        await insertRow(db, obj2);
        await insertRow(db, obj3);

        let users = await getAll(db);
        console.log("All users List:", users);

    })();
}
else {
// this is a top-level await
    (async () => {
        // open the database
        db = await open({
            filename: DBNAME,
            driver: sqlite3.Database
        });
        let users = await getAll(db);

    })()
}


// global
// const db = createDbConnection();
app.get('/', function (req, res) {
    console.log("req",req);
    res.send('Hello World');
})
app.get('/api/users',  async function (req, res) {
    console.log("get all users");
    console.log(req.params);
    const users = await getAll2(db);
    console.log('get--> /api/users',users);
    res.json(users);
})

app.get('/api/users/:id',  async function (req, res) {
    console.log("get a users by id");
    console.log(req.params.id);
    const users = await getAll2(db);
    console.log('get--> /api/users',users);
    res.json(users);
})
app.post('/api/users', async function (req, res) {

    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
    console.log("post: body", req.body);
    const id = req.body.id.toString();
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    let obj = [id,firstName,lastName,email];
    const result = await db.run(
        'INSERT INTO users (id, firstName, lastName, email) VALUES (?,?,?,?)',
        obj
    )

    res.json(result);

})

app.put('/api/users', function (req, res) {
    res.json([{ user: 'Fred' }, { user: 'Jane' }]);
})

app.delete('/api/users', function (req, res) {
    res.json([{ user: 'Fred' }, { user: 'Jane' }]);
})


const server = app.listen(8081, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
