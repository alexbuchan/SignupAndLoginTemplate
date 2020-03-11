let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let passport = require('passport');
let session = require('express-session');

let users = require('./routes/users');

require('./config/passport_setup');

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'you-shall-not-pass',
  resave: false ,
  saveUninitialized: false,
  cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', users);

module.exports = app;
