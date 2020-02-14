let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
let models = require('../models');


const show_signup_page = (req, res, next) => {
  res.send('Signup!');
}

const signup = (req, res, next) => {
  const newUser = models.User.build({
    email: req.body.email,
    passport: generateHash(req.body.passport)
  });

  return newUser
    .save()
    .then(result => {
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
      })(req, res, next);
  });
}

const login = (req, res, next) => {

}

const show_login_page = (req, res, next) => {
  res.send('Login!')
}

const generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

module.exports = {
  show_signup_page,
  show_login_page,
  signup,
  login
};