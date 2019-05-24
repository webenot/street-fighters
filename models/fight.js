const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const GeneralSchema = {
    _id: {
        type: Schema.Types.String,
        default: shortId.generate
    },
    fighters: {
        fighter1: {
            user: {
                type: Schema.Types.String,
                ref: 'User'
            },
            fighter: {
                type: Schema.Types.String,
                ref: 'UserFighter'
            },
        },
        fighter2: {
            user: {
                type: Schema.Types.String,
                ref: 'User'
            },
            fighter: {
                type: Schema.Types.String,
                ref: 'Fighter'
            },
        },
    },
    history: {
        type: Schema.Types.Array,
        default: [
            {
                hit1: {
                    type: Schema.Types.Decimal,
                    default: 0
                },
                hit2: {
                    type: Schema.Types.Decimal,
                    default: 0
                },
                roundTime: {
                    type: Schema.Types.Date,
                    default: Date.now
                }
            }
        ]
    },
    createTime: {
        type: Schema.Types.Date,
        default: Date.now
    }
};

const GeneralModel = new Schema(GeneralSchema);

module.exports = mongoose.model('Fight', GeneralModel);