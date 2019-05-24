const express = require('express');
const router = express.Router();
const config = require('config');
const passport = require('passport');

router.get('/', function(req, res, next) {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/user/' + req.session._id
    });
    res.render('login', { title: config.get('app:title') });
});

module.exports = router;