const passport = require('passport');
const jwt = require('jsonwebtoken');

const signup = (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) { console.log('Error:', err); }

    if (info !== undefined) {
      console.log('Info Message (Authentication failed):', info.message);
      res.send(info.message);
    }

    if (user) {
      req.logIn(user, err => {
        if (err) { return next(err); }
        
        loginReponse(res, user, 'User registered and logged in.');
      });
    }
  })(req, res, next);
}

const login = (req, res, next) => {
  passport.authenticate('login', (err, user) => {
    req.logIn(user, { session: false }, err => {
      if (err) { return next(err); }

      loginReponse(res, user, 'User logged in.');
    });
  })(req, res, next);
}

const logout = (req, res, next) => {
  res.status(200).send({
    auth: false,
    message: 'User logged out'
  });
}

/* "Private" methods */

const loginReponse = (res, user, message) => {
  const token = jwt.sign({ id: user.email }, 'the-flame-of-anor');
  res.status(200).send({
    auth: true,
    token,
    message,
    user
  });
}

module.exports = {
  signup,
  login,
  logout
};
