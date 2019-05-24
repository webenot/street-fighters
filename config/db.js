module.exports = {
    db: {
        //uri: 'mongodb://localhost:27017/heroku_zfh39rpk',
        uri: MONGODB_URI,
        connect: {
            config: {
                autoIndex: false,
            },
            useNewUrlParser: true
        }
    }
};