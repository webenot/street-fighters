const express = require('express');
const config = require('config');
const passport = require('passport');

const router = express.Router();

router.get('/', async function(req, res, next) {
    passport.authenticate('local');
    if (process.env.NODE_ENV === 'development') console.log(req.user);
    if (!req.user) {
        res.render('index', { title: config.get('app:title') });
    } else {
        res.render('index', { title: config.get('app:title'), user: req.user });
    }
});

module.exports = router;
