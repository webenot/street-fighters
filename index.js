// импорт модуля "http"
const http = require('http');
// импорт модуля "fs"
const fs = require('fs');
const port = 3000;

// создание потока для записи в файл
const logFile = fs.createWriteStream('log.txt', { flags: 'a' });

// коллбек на каждый HTTP-запрос
const requestHandler = (request, response) => {
    console.log(request.url);
    // запись в файл
    let date = new Date();
    let month = date.getMonth();
    month = month < 10 ? '0' + month : month;
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    let hours = date.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    date = date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    let userAgent = request.rawHeaders[request.rawHeaders.indexOf('User-Agent') + 1];
    logFile.write(`${date} ${request.method} ${request.url} ${response.statusCode}\tUser-Agent: ${userAgent}\tIP: ${request.connection.remoteAddress}\n`);
    response.end('Ping-Pong')
};

// создание HTTP-сервера
const server = http.createServer(requestHandler);

// начало прослушивания HTTP-сервера
server.listen(port, (err) => {
    if (err) {
        return console.log('Ошибочка вышла', err)
    }
    console.log(`Сервер запущен по адресу http://localhost:${port}`)
});