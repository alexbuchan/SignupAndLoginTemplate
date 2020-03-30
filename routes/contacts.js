const express = require('express');

const router = express.Router();

/* Controllers */
const contact = require('../controllers/contact');

/* Routes */

router.get('/contacts', contact.getContacts);

module.exports = router;
