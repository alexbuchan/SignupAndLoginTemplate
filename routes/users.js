let express = require('express');
let router = express.Router();
const passport = require('passport');

/* Controllers */
let user = require('../controllers/user');

/* Routes */

/* POST Signup new user */
router.post('/signup', user.signup);

/* POST Login user */
router.post('/login', user.login);

/* POST Logout user */
router.post('/logout', user.logout);

module.exports = router;
