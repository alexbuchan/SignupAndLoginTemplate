const passport = require('passport');
require('dotenv').config();
const jwt = require('jsonwebtoken');

/* Public methods */

/* 
// POST Signup Route
*/
const signup = (req, res, next) => {
  passportAuthenticate(req, res, next, 'register', 'User registered and logged in.');
};

/* 
// POST Login Route
*/
const login = (req, res, next) => {
  passportAuthenticate(req, res, next, 'login', 'User logged in.');
};

/* 
// Authenticate Token
*/
// eslint-disable-next-line consistent-return
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (authHeader === null) return res.status(401);

  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
};

/* Private methods */

const passportAuthenticate = (req, res, next, strategy, message) => {
  passport.authenticate(strategy, (err, user, info) => {
    // eslint-disable-next-line no-console
    if (err) { res.send(err); }

    if (info !== undefined) {
      // eslint-disable-next-line no-console
      console.log('Info Message (Authentication failed):', info.message);
      errorHandler(res, info.message, 400);
    }

    if (user) {
      // eslint-disable-next-line consistent-return
      req.logIn(user.id, () => {
        if (err) { return errorHandler(res, err, 401); }
        loginResponse(res, user, message);
      });
    }
  })(req, res, next);
};

const loginResponse = (res, user, message) => {
  const token = jwt.sign({
    user: {
      username: user.username,
      email: user.email,
    },
    message,
    auth: true,
  }, process.env.ACCESS_TOKEN_SECRET);
  res.status(200).json({ token });
};

const errorHandler = (res, error, status) => {
  res.status(status).json({ error });
};

module.exports = {
  authenticateToken,
  signup,
  login,
};
