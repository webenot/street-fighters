const db = require('storage/db');

module.exports = () => {
    return db.init().then(() => {
        console.info('Connected to DB');

        db.once('close', () => {
            console.info('Close connection to DB');
        });
    });
};