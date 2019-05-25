const db = require('storage/db');
const Fighter = require('../../models/fighter');
const fighterService = require('../../services/fighter.service');

module.exports = () => {
    return db.init().then(() => {
        console.info('Connected to DB');

        Fighter.countDocuments({}, async (err, count) => {
            const fightersList = await fighterService.getFighters();
            let length = fightersList.length;
            if (count < length) {
                const fightersList = await fighterService.getFighters();

                for (let i = 0; i < length; i++){
                    let item = fightersList[i];
                    let fighter = await Fighter.findOne({'name': item.name});
                    if (fighter) continue;

                    fighter = await fighterService.getFightersDetails(item._id);
                    if (!fighter) continue;

                    delete fighter._id;

                    const newFighter = await new Fighter(fighter);
                    await newFighter.save();
                }
            }
        });

        db.once('close', () => {
            console.info('Close connection to DB');
        });
    });
};