const User = require('../models/user');

module.exports.renderUserRegisterForm = (req, res) => {
  res.render('users/register');
};

module.exports.registerNewUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('/campgrounds');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register');
  }
};

module.exports.renderUserLoginForm = (req, res) => {
  res.render('users/login');
};

module.exports.loginUser = async (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = res.locals.returnTo || '/campgrounds';
  delete res.locals.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout(err => {
    if (err) { 
      return next(err); 
    }
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
  });
};