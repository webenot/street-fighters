const express = require('express');
const config = require('config');

const Fighter = require('../models/fighter');

const router = express.Router();

router.get('/', async (req, res, next) => {
    if (!req.user)
        res.redirect('/login');
    const fighters = await Fighter.find({});
    res.render('select-fighter', {title: config.get('app:title'), fighters: fighters});
});

router.post('/', async (req, res, next) => {
    if (!req.user)
        res.redirect('/login');
    const fighters = await Fighter.find({});
    res.render('select-fighter', {title: config.get('app:title'), fighters: fighters});
});

module.exports = router;