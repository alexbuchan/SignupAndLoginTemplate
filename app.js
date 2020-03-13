let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let passport = require('passport');
let session = require('express-session');

let users = require('./routes/users');

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};

require('./config/passport_setup');

// const env = process.env.NODE_ENV || 'development';
// const port = process.env.PORT || '3000';
let app = express();

app.use(cors({ origin: 'http://localhost:8080' , credentials :  true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'you-shall-not-pass',
  resave: false ,
  saveUninitialized: false,
  cookie : {
    secure : false,
    maxAge : 360000000 // 2 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', users);

module.exports = app;
