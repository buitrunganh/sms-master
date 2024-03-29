const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

router.post('/user/create', userController.createUser);

module.exports = router;