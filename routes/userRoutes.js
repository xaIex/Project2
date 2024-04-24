const express = require('express');
const router = express.Router();
const User = require('../models/config');
const{ registerAccount, loginAccount, logoutAccount } = require('../controllers/userController');

router.post('/createAccount', registerAccount);
router.post('/account', loginAccount);
router.post('/logout', logoutAccount)

module.exports = router;