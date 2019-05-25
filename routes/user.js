const express = require('express');
const config = require('config');

const User = require('../models/user').User;
const UserFighter = require('../models/userFighter');
const Fighter = require('../models/fighter');

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

    const user = await User.findOne({'_id' : req.user._id});
    const fighters = await UserFighter.find({'user' : req.user._id});
    for (let i = 0, length = fighters.length; i < length; i++) {
        let item = fighters[i];
        fighters[i].fighter = await Fighter.findOne({'_id': item.fighter});
    }

    let message = req.params;
    if (message.error) {
        res.render('user', { title: config.get('app:title'), user, fighters, error: message.error });
    } else if (message.success) {
        res.render('user', { title: config.get('app:title'), user, fighters, success: message.success });
    }
    res.render('user', { title: config.get('app:title'), user, fighters });
});

router.post('/:id', async (req, res, next) => {
    if (!req.user)
        res.redirect('/login');

    const user = await User.findOne({'_id' : req.user._id});
    const fighters = await UserFighter.find({'user' : req.user._id});

    res.render('user', { title: config.get('app:title'), user, fighters });
});

module.exports = router;