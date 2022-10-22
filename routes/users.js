const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const usersController = require('../controllers/users');
const User = require('../models/user');

router.get('/register', usersController.renderUserRegisterForm);

router.post('/register', catchAsync(usersController.registerNewUser));

router.get('/login', usersController.renderUserLoginForm);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), usersController.loginUser);

router.get('/logout', usersController.logoutUser);

module.exports = router;