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
const User = require('models/user').User;
const validatePassword = require('models/user').validatePassword;

const postcssMiddleware = require('postcss-middleware');
const autoprefixer = require('autoprefixer');

const indexRouter = require('routes/index');
const usersRouter = require('routes/users');
const registerRouter = require('routes/register');
const loginRouter = require('routes/login');
const userRouter = require('routes/user');
const logoutRouter = require('routes/logout');

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
httpServer.use(sassMiddleware({
  src: staticDir,
  dest: staticDir,
  debug: true,
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
  outputStyle: 'extended'
}));
httpServer.use('/css', postcssMiddleware({
  plugins: [
    /* Plugins */
    autoprefixer({
      /* Options */
    })
  ],
  src: function(req) {
    return path.join(staticDir + '/stylesheets', req.url);
  }
}));
httpServer.use(express.static(staticDir));

httpServer.use(session({
  cookie: { maxAge: 60000 },
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false
}));

passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(username, password, done) {
      let login = username.split('@');
      if (login.length > 1) {
        User.findOne({ email: username }, async function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          let valid = await validatePassword(password, user.password);
          if (!valid) { return done(null, false); }
          return done(null, user);
        });
      } else {
        User.findOne({ login: username }, async function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          let result = false;
          let valid = await validatePassword(password, user.password);
          if (!valid) { return done(null, false); }
          if (!result) { return done(null, false); }
          return done(null, user);
        });
      }
    }
));

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
httpServer.use((req, res, next) => {
  res.locals.success_mesages = req.flash('success');
  res.locals.error_messages = req.flash('error');
  next()
});

const initRoutes = () => Promise.resolve().then(() => {
  httpServer.use('/', indexRouter);
  httpServer.use('/users', usersRouter);
  httpServer.use('/register', registerRouter);
  httpServer.use('/login', loginRouter);
  httpServer.use('/user', userRouter);
  httpServer.use('/logout', logoutRouter);

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
