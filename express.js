const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/:route', function (req, res) {
    console.log(req.query);
    console.log(req.params);
    res.send('Hello World');
});

// создание функции слушателя для POST-запросов по адресу "/test"
app.post('/test', function (req, res) {
    console.log(req.body);
    res.send('Hello World POST');
});

app.listen(3000);