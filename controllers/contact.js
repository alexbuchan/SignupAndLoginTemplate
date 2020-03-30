const passport = require('passport');
const request = require('axios');

const ControllerHelper = require('./controllerHelper');

/* Public methods */

const getContacts = (req, res, next) => {
  passport.authenticate('jwt', (err, jwtPayload, info) => {
    if (err) { res.send(err); }

    if (info !== undefined) {
      // eslint-disable-next-line no-console
      console.log('Info Message (Authentication failed):', info.message);
      ControllerHelper.errorHandler(res, info.message, 400);
    }

    if (jwtPayload) {
      callContactsAPI().then(contacts => {
        res.status(200).send(contacts.data);
      });
    }
  })(req, res, next);
}

/* Private methods */

callContactsAPI = () => {
  const response = request.get('https://jsonplaceholder.typicode.com/users');
  return response;
}

module.exports = {
  getContacts
}