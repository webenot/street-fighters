const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = global.Promise;

const db = mongoose.connection;

module.exports = db;
module.exports.disconnect = mongoose.disconnect;

module.exports.init = () => {
    return new Promise((resolve, reject) => {

        mongoose.connect(config.get('db:uri'), config.get('db:connect'));

        db.once('error', err => {
            reject(err);
        });

        db.once('open', () => {
            db.on('error', err => {
                console.error(err);
            });

            resolve();
        });
    });
};