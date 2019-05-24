const express = require('express');
const router = express.Router();
const Joi = require('joi');
const User = require('../models/user').User;
const hashPassword = require('../models/user').hashPassword;
const config = require('config');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  login: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{1,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

router.route('/').get(function(req, res, next) {
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/user/' + req.session._id
  });
  res.render('login', {title: config.get('app:title')});
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
    failureRedirect: '/login',
    successRedirect: '/user/' + req.session._id
  });
  res.render('login', {title: config.get('app:title')});
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

      const login = result.value.email.split('@');
      if (login.length > 1) {
        const user = await User.findOne({ 'email': result.value.email });
        if (user) {
          bcrypt.compare(result.value.password, user.password, function(err, result) {
            if (err) {
              res.render('login', {error: 'Data entered is not valid. Please try again.', title: config.get('app:title')});
              return;
            }
            if (result) {
              res.redirect('/user/' + user._id);
            }
            res.render('login', {error: 'Data entered is not valid. Please try again.', title: config.get('app:title')});
          });
        }
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
