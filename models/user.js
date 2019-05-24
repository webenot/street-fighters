const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const shortId = require('shortid');

const GeneralSchema = {
    _id: {
        type: Schema.Types.String,
        default: shortId.generate
    },
    login: {
        type: Schema.Types.String,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
    },
    fighters: {
        type: Schema.Types.Array,
        default: [
            {
                type: Schema.Types.String,
                ref: 'UserFighter'
            }
        ]
    },
    createTime: {
        type: Schema.Types.Date,
        default: Date.now
    }
};

const GeneralModel = new Schema(GeneralSchema);

module.exports.User = mongoose.model('User', GeneralModel);
module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch(error) {
        throw new Error('Hashing failed', error);
    }
};