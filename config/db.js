module.exports = {
    db: {
        uri: 'mongodb://localhost:27017/heroku_zfh39rpk',
        connect: {
            config: {
                autoIndex: false,
            },
            useNewUrlParser: true
        }
    }
};