const express = require('express');
const { authUser, createUser } = require('../controllers/userController.js');

const router = express.Router();

router.post('/signup', createUser);

router.post('/signin', authUser);

module.exports = router;
