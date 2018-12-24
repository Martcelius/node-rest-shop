const express = require('express');
const userController = require('../controller/user');
const router = express.Router();


router.post('/signup', userController.user_signup);

router.post('/login', userController.user_login);

module.exports = router;