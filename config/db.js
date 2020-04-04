require('dotenv').config();

module.exports = {
    db: {
        //uri: 'mongodb://localhost:27017/heroku_zfh39rpk',
        uri: process.env.MONGODB_URI,
        connect: {
            config: {
                autoIndex: false,
            },
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    }
};
