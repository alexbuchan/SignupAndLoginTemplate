let express = require('express');
let router = express.Router();

/* Controllers */
let user = require('../controllers/user');

/* Routes */

/* GET root */
router.get('/', (req, res, next) => {
  res.send('API Online!');
});

/* GET User Signup page */
router.get('/signup', user.show_signup_page);

/* GET User Login page */
router.get('/login', user.show_login_page);


module.exports = router;
