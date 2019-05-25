const express = require('express');

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

const Fighter = require('../models/fighter');
const User = require('../models/user').User;
const UserFighter = require('../models/userFighter');

router.get('/:id', async (req, res, next) => {
    if (!req.user)
        res.redirect('/login');

    const message = await addFighter(req);

    let params = '';

    if (message) {
        if (message.error) {
            params = '?error=' + message.error;
        } else if (message.success) {
            params = '?success=' + message.success;
        }
    }
    res.redirect('/user/' + req.user._id + params);
});

router.post('/:id', async (req, res, next) => {
    if (!req.user)
        res.redirect('/login');

    const message = await addFighter(req);

    let params = '';

    if (message) {
        if (message.error) {
            params = '?error=' + message.error;
        } else if (message.success) {
            params = '?success=' + message.success;
        }
    }
    res.redirect('/user/' + req.user._id + params);
});

async function addFighter(req) {
    const userCriteria = {
        '_id': req.user._id
    };
    const fighterCriteria = {
        '_id': req.params.id
    };
    let fighter = await Fighter.findOne(fighterCriteria);
    let message = {};

    if (fighter) {
        console.log(userCriteria);
        let userFightersCount = await UserFighter.countDocuments({user: req.user._id});
        if (userFightersCount === 6) {
            message.error = "You can't have more then 6 fighters";
        } else {
            const newUserFighter = {
                user: req.user._id,
                currentConfig: {
                    health: fighter.health,
                    attack: fighter.attack,
                    defense: fighter.defense
                },
                fighter: fighter
            };
            console.log(newUserFighter);
            const newFighter = await new UserFighter(newUserFighter);
            let id = await newFighter.save();

            const userFightersList = await User.findOne(userCriteria);

            userFightersList.fighters.push(id);

            await User.updateOne(userCriteria, {fighters: userFightersList.fighters});
            message.success = "You successfully added a new fighter";
        }
    }

    return message;
}

module.exports = router;