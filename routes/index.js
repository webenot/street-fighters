const express = require('express');
const config = require('config');
const passport = require('passport');
const User = require('../models/user').User;

const router = express.Router();

router.get('/', async function(req, res, next) {
    passport.authenticate('local');
    let user = await User.findOne({ '_id': req.session._id });
    if (!user) {
        res.render('index', { title: config.get('app:title') });
    } else {
        res.render('index', { title: config.get('app:title'), user: user });
    }
});

module.exports = router;
