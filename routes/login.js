const express = require('express');
const router = express.Router();
const config = require('config');
const passport = require('passport');

router.get('/', function(req, res, next) {
    passport.authenticate('local');
    if (!req.user)
        res.render('login', { title: config.get('app:title') });
    else
        res.redirect('/user/' + req.user._id);
});

module.exports = router;