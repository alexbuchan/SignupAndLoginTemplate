const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');

const BCRYPT_SALT_ROUNDS = 12;

// REGISTER AUTHENTICATION STRATEGY
passport.use('register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
},
(req, email, password, done) => {
  models.User.findOne({ where: { email } })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user != null) {
        // eslint-disable-next-line no-console
        console.log(`Email '${user.email}' already taken.`);
        return done(null, false, { message: `Email "${user.email}" already taken.` });
      }

      bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
        models.User.create({
          name: req.body.name,
          email,
          password: hashedPassword,
        }).then((response) => {
          // eslint-disable-next-line no-console
          console.log(`Created user: ${req.body.name}, with email: ${response.email}`);
          return done(null, response);
        });
      });
    });
}));

// LOGIN AUTHENTICATION STRATEGY
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      models.User.findOne({
        where: {
          email,
        },
      // eslint-disable-next-line consistent-return
      }).then((user) => {
        try {
          if (user === null) {
            // eslint-disable-next-line no-console
            console.log('Bad email.');
            return done(null, false, { message: 'Email or password are incorrect.' });
          }

          bcrypt.compare(password, user.password).then((response) => {
            if (response !== true) {
              // eslint-disable-next-line no-console
              console.log('Bad password.');
              return done(null, false, { message: 'Email or password are incorrect.' });
            }
            // eslint-disable-next-line no-console
            console.log('User found and authenticated.');
            return done(null, user);
          });
        } catch (err) {
          done(err);
        }
      });
    },
  ),
);

passport.serializeUser((userID, done) => {
  done(null, userID);
});

passport.deserializeUser((userID, done) => {
  done(null, userID);
});
