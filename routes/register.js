const express = require('express');
const router = express.Router();
const config = require('config');

router.get('/', function(req, res, next) {
    if (!req.user)
        res.render('register', { title: config.get('app:title') });
    else
        res.redirect('/user/' + req.user._id);
});

module.exports = router;