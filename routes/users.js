const express = require('express');
const router = express.Router();
const Joi = require('joi');
const User = require('../models/user').User;
const hashPassword = require('../models/user').hashPassword;
const config = require('config');
const validatePassword = require('models/user').validatePassword;
const passport = require('passport');

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  login: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{1,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

router.route('/register').get(function(req, res, next) {
  passport.authenticate('local', {
    failureRedirect: '/register'
  });
  if (!req.user)
    res.redirect('/register');
  else
    res.redirect('/user/' + req.user._id);
})
  .post(async function(req, res, next) {
    try {
      const result = Joi.validate(req.body, userSchema);
      if (result.error) {
        req.flash('error', 'Data entered is not valid. Please try again.');
        res.render('register', {error: 'Data entered is not valid. Please try again.', title: config.get('app:title')});
        return;
      }

      const email = await User.findOne({ 'email': result.value.email });
      if (email) {
        req.flash('error', 'Email is already in use.');
        res.render('register', {error: 'Email is already in use.', title: config.get('app:title')});
        return;
      }

      const login = await User.findOne({ 'login': result.value.login });
      if (login) {
        req.flash('error', 'Login is already in use.');
        res.render('register', {error: 'Login is already in use.', title: config.get('app:title')});
        return;
      }

      const hash = await hashPassword(result.value.password);

      delete result.value.confirmationPassword;
      result.value.password = hash;

      const newUser = await new User(result.value);
      await newUser.save();

      req.flash('success', 'Registration successfully, go ahead and login.');
      res.redirect('/login');

    } catch(error) {
      next(error);
    }
});

router.route('/login').get((req, res, next) => {
  passport.authenticate('local', {
    failureRedirect: '/login'
  });
  if (!req.user)
    res.redirect('/login');
  else
    res.redirect('/user/' + req.user._id);
})
  .post(async (req, res, next) => {
    const loginSchema = Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required()
    });
    try {
      const result = Joi.validate(req.body, loginSchema);
      if (result.error) {
        req.flash('error', 'Data entered is not valid. Please try again.');
        res.render('login', {error: 'Data entered is not valid. Please try again.', title: config.get('app:title')});
        return;
      }

      let login = result.value.email.split('@');
      let user;
      if (login.length > 1) {
        user = await User.findOne({ 'email': result.value.email });
      } else {
        user = await User.findOne({ 'login': result.value.email });
      }
      if (user) {
        let valid = await validatePassword(result.value.password, user.password);
        if (!valid) {
          res.render('login', {error: 'Data entered is not valid. Please try again.', title: config.get('app:title')});
        } else {
          req.login(user, (err) => {
            if (err) { return next(err); }
            return res.redirect('/user/' + req.user._id);
          });
        }
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
