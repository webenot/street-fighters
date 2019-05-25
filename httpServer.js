const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const rfs = require('rotating-file-stream');
const fs = require('fs');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const postcssMiddleware = require('postcss-middleware');

var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

function pad(num) {
  return (num > 9 ? "" : "0") + num;
}

function generator(time, index) {
  if (!time) return "file.log";

  const month = time.getFullYear() + "" + pad(time.getMonth() + 1);
  const day = pad(time.getDate());
  const hour = pad(time.getHours());
  const minute = pad(time.getMinutes());

  return month + "/" + month + day + "-" + hour + minute + "-" + index + "-file.log";
}

// создание потока для записи в файл
const accessLogStream = rfs(generator, {
  interval: '1d', // rotate daily
  path: logDirectory
});

const httpServer = express();

const config = require('config');
const staticDir =  config.get('httpServer:staticDir');
const viewsDir =  config.get('views:viewsDir');

// view engine setup
httpServer.set('views', viewsDir);
httpServer.engine('handlebars', expressHandlebars({ defaultLayout: 'layout' }));
httpServer.set('view engine', 'pug');

httpServer.use(logger('[:date[clf]] :remote-addr - :remote-user ":method :url HTTP/:http-version" :status User-Agent: ":user-agent" :res[content-length] - :response-time ms\n',{stream: accessLogStream}));
httpServer.use(logger('dev'));
httpServer.use(bodyParser.json());
httpServer.use(bodyParser.urlencoded({ extended: false }));
httpServer.use(cookieParser());
httpServer.use(sassMiddleware(config.get('sass')));
httpServer.use('/css', postcssMiddleware(config.get('postcss')));
httpServer.use(express.static(staticDir));

httpServer.use(session(config.get('session')));

const userValidator = require('middlewares/userValidator.middleware');

passport.use(new LocalStrategy(config.get('localStrategy'), userValidator));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log(user);
  done(null, user);
});

httpServer.use(passport.initialize());
httpServer.use(passport.session());

httpServer.use(flash());

const flashMiddleware = require('middlewares/flash.middleware');

httpServer.use(flashMiddleware);

const indexRouter = require('routes/index');
const usersRouter = require('routes/users');
const registerRouter = require('routes/register');
const loginRouter = require('routes/login');
const userRouter = require('routes/user');
const logoutRouter = require('routes/logout');
const selectRouter = require('routes/select-fighter');
const fighterRouter = require('routes/fighter');

const initRoutes = () => Promise.resolve().then(() => {
  httpServer.use('/', indexRouter);
  httpServer.use('/users', usersRouter);
  httpServer.use('/register', registerRouter);
  httpServer.use('/login', loginRouter);
  httpServer.use('/user', userRouter);
  httpServer.use('/logout', logoutRouter);
  httpServer.use('/select-fighter', selectRouter);
  httpServer.use('/fighter', fighterRouter);

  // catch 404 and forward to error handler
  httpServer.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  httpServer.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: config.get('app:title')});
  });
});

module.exports = httpServer;
module.exports.initRoutes = initRoutes;
