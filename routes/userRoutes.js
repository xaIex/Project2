const express = require('express');
const router = express.Router();
const User = require('../models/config');
const{ registerAccount, loginAccount } = require('../controllers/userController');

router.post('/createAccount', registerAccount);
router.post('/account', loginAccount);

module.exports = router;