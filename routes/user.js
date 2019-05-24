const express = require('express');
const config = require('config');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

router.get('/:id', async function(req, res, next) {
    passport.authenticate('local', { failureRedirect: '/login' });
    let user = await User.User.findOne({ '_id': req.params.id });
    console.log(user.fighters);
    if (user) {
        res.render('user', { title: config.get('app:title'), user: user });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;