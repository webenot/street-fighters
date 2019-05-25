const User = require('models/user').User;
const validatePassword = require('models/user').validatePassword;

function userValidator(username, password, done) {
    let login = username.split('@');
    if (login.length > 1) {
        User.findOne({ email: username }, async function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            let valid = await validatePassword(password, user.password);
            if (!valid) { return done(null, false); }
            return done(null, user);
        });
    } else {
        User.findOne({ login: username }, async function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            let result = false;
            let valid = await validatePassword(password, user.password);
            if (!valid) { return done(null, false); }
            if (!result) { return done(null, false); }
            return done(null, user);
        });
    }
}

module.exports = userValidator;