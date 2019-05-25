const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const GeneralSchema = {
    _id: {
        type: Schema.Types.String,
        default: shortId.generate
    },
    user: {
        type: Schema.Types.String,
        ref: 'User'
    },
    fighter: {
        type: Schema.Types.String,
        ref: 'Fighter'
    },
    fights: {
        type: Schema.Types.Decimal,
        default: 0
    },
    level: {
        fights: {
            type: Schema.Types.Decimal,
            default: 0
        },
    },
    freePoints: {
        type: Schema.Types.Decimal,
        default: 5
    },
    currentConfig: {
        health: {
            type: Schema.Types.Decimal,
            default: 1
        },
        attack: {
            type: Schema.Types.Decimal,
            default: 1
        },
        defense: {
            type: Schema.Types.Decimal,
            default: 1
        },
    },
    createTime: {
        type: Schema.Types.Date,
        default: Date.now
    }
};

const GeneralModel = new Schema(GeneralSchema);

module.exports = mongoose.model('UserFighter', GeneralModel);