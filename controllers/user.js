let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
let models = require('../models');

const signup = (req, res, next) => {
  const newUser = models.User.build({
    name: req.body.name,
    email: req.body.email,
    password: generateHash(req.body.password)
  });

  return newUser
    .save()
    .then(result => {
      passport.authenticate('', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
      })(req, res, next);
  });
}

const login = (req, res, next) => {
  console.log('LOGIN!!')
  passport.authenticate('', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}

const generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

module.exports = {
  signup,
  login
};
