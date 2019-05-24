const express = require('express');
const config = require('config');

const router = express.Router();

router.get('/', (req, res, next) => {
    if (!req.user)
        res.redirect('/login');
    res.redirect('/user/' + req.user._id);
});

router.post('/', (req, res, next) => {
    if (!req.user)
        res.redirect('/login');
    res.redirect('/user/' + req.user._id);
});

router.get('/:id', async (req, res, next) => {
    if (!req.user)
        res.redirect('/login');
    res.render('user', { title: config.get('app:title'), user: req.user });
});

router.post('/:id', (req, res, next) => {
    if (!req.user)
        res.redirect('/login');
    res.render('user', { title: config.get('app:title'), user: req.user });
});

module.exports = router;