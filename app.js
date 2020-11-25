
const createError = require('http-errors');
const express = require('express');
const morgan=require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
require('dotenv').config();

const page = require('./routes/page');
const { sequelize } = require('./models');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/users');
const passportConfig= require('./passport/passportConfig');

const app = express();
sequelize.sync();
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized:false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly:true,
    secure: false,
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', page);
app.use('/auth', authRouter);
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use('/post', postRouter);
app.use('/user', userRouter);
//
// catch 404 and forward to error handler
app.use((req, res, next) =>{
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(app.get('port'), () =>{
  console.log(app.get('port'), '번 포트에서 대기 중');
});

module.exports = app;
