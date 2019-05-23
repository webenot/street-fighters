var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var rfs = require('rotating-file-stream');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

function pad(num) {
    return (num > 9 ? "" : "0") + num;
}

function generator(time, index) {
    if (!time) return "file.log";

    var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
    var day = pad(time.getDate());
    var hour = pad(time.getHours());
    var minute = pad(time.getMinutes());

    return month + "/" + month + day + "-" + hour + minute + "-" + index + "-file.log";
}

// создание потока для записи в файл
var accessLogStream = rfs(generator, {
    interval: '1d', // rotate daily
    path: logDirectory
});

var app = express();

app.use(logger('[:date[clf]] :remote-addr - :remote-user ":method :url HTTP/:http-version" :status User-Agent: ":user-agent" :res[content-length] - :response-time ms',{stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
