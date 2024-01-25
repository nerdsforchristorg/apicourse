const express = require('express');
const app = express();
app.get('/', function (req, res) {
    res.send('Hello World');
})
app.get('/users', function (req, res) {
    res.json([{ user: 'Fred' }, { user: 'Jane' }]);
})
const server = app.listen(8081, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
