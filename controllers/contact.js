const passport = require('passport');
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
      res.status(200).send({
        contacts: [
          {
            first_name: 'John',
            last_name: 'of Galilee',
            aka: 'the Baptist',
            age: 25
          },
          {
            first_name: 'Tod',
            last_name: 'Smith',
            aka: 'the Skinny',
            age: 22
          }
        ]
      });
    }
  })(req, res, next);
}

module.exports = {
  getContacts
}