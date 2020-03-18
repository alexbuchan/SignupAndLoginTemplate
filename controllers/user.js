const passport = require('passport');
require('dotenv').config();
const jwt = require('jsonwebtoken');

/* "Private" methods */

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


/* "Public" methods */

const signup = (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    // eslint-disable-next-line no-console
    if (err) { res.send(err); }

    if (info !== undefined) {
      // eslint-disable-next-line no-console
      console.log('Info Message (Authentication failed):', info.message);
      errorHandler(res, info.message, 409);
    }

    if (user) {
      // eslint-disable-next-line consistent-return
      req.logIn(user.id, () => {
        if (err) { return next(err); }
        loginResponse(res, user, 'User registered and logged in.');
      });
    }
  })(req, res, next);
};

const login = (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    // eslint-disable-next-line consistent-return
    if (err) { res.send(err); }

    if (info !== undefined) {
      // eslint-disable-next-line no-console
      console.log('Info Message (Authentication failed):', info.message);
      errorHandler(res, info.message, 401);
    }

    if (user) {
      req.logIn(user.id, () => {
        if (err) { return errorHandler(res, err, 401); }
        return loginResponse(res, user, 'User logged in.');
      });
    }
  })(req, res, next);
};

const logout = (req, res) => {
  res.status(200).send({
    auth: false,
    message: 'User logged out',
  });
};

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

module.exports = {
  authenticateToken,
  signup,
  login,
  logout,
};
