const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const SECRET = process.env.ACCESS_TOKEN_SECRET;
const models = require('../models');

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

      models.User.create({
        username: req.body.username,
        email,
        password,
      })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(`Created user: ${req.body.username}, with email: ${response.email}`);
          return done(null, response);
        })
        .catch((error) => {
          const message = error.errors.map((err) => ({ field: err.path, message: err.message }));
          return done(null, false, { message });
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

passport.use(
  'jwt',
  new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
  },
  (jwtPayload, done) => {
    try {
      return done(null, jwtPayload);
    } catch (err) {
      done(err);
    }
  }
));

passport.serializeUser((userID, done) => {
  done(null, userID);
});

passport.deserializeUser((userID, done) => {
  done(null, userID);
});
