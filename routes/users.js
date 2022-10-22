const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const usersController = require('../controllers/users');
const User = require('../models/user');

router.route('/register')
  .get(usersController.renderUserRegisterForm)
  .post(catchAsync(usersController.registerNewUser));

router.route('/login')
  .get(usersController.renderUserLoginForm)
  .post(
    passport.authenticate('local', { 
      failureFlash: true, 
      failureRedirect: '/login' 
    }), 
    usersController.loginUser);

router.get('/logout', usersController.logoutUser);

module.exports = router;