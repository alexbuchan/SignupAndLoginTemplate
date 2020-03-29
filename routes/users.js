const express = require('express');

const router = express.Router();

/* Controllers */
const user = require('../controllers/user');

/* Routes */

/* POST Signup new user */
router.post('/signup', user.signup);

/* POST Login user */
router.post('/login', user.login);

module.exports = router;
