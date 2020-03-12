const jwtSecret = require('./jwtConfig');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const models = require('../models');


// REGISTER AUTHENTICATION STRATEGY
passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
  },
    (req, email, password, done) => {
      models.User.findOne({ where: { email: email }})
        .then(user => {
          if (user != null) {
            console.log(`Email '${user.email}' already taken.`);
            return done(null, false, { message: `Email '${user.email}' already taken.` });
          } else {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
              models.User.create({
                name: req.body.name,
                email: email,
                password: hashedPassword
              }).then(user => {
                console.log(`Created user: ${req.body.name}, with email: ${user.email}`);
                return done(null, user);
              });
            });
          }
        });
    },
  ),
);

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
          email: email,
        },
      }).then(user => {
        try {
          if (user === null) {
            console.log('Bad email.')
            return done(null, false, { message: 'Bad email.' });
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log('Bad password.');
                return done(null, false, { message: 'Bad password.' });
              }
              console.log('User found and authenticated.');
              return done(null, user);
            }); 
          }
        } catch(err) {
          done(err);
        }
      });
    },
  ),
);

passport.use('jwt', new JWTStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: 'you-shall-not-pass',
  },
  (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done('jwt expired');
    }

    return done(null, jwtPayload);
  }
));

passport.serializeUser((user_id, done) => {
  console.log('serialize user', user_id);
  done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
  console.log('deserialize user', user_id);
  done(null, user_id);
});