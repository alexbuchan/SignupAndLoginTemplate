let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let passport = require('passport');
let session = require('express-session');

let users = require('./routes/users');

require('./passport_setup')(passport);

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: false ,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', users);

module.exports = app;
