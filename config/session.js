module.exports = {
    session: {
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
        secret: 'codeworkrsecret',
        saveUninitialized: false,
        resave: false
    }
};