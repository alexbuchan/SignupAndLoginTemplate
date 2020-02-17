let express = require('express');
let router = express.Router();

/* Controllers */
let user = require('../controllers/user');

/* Routes */

/* GET root */
router.get('/', (req, res, next) => {
  res.send('API Online!');
});

/* POST Signup new user */
router.post('/signup', user.signup);

/* GET Login user */
router.post('/login', user.login);


module.exports = router;
