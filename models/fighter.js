const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const GeneralSchema = {
    _id: {
        type: Schema.Types.String,
        default: shortId.generate
    },
    name: {
        type: Schema.Types.String,
        default: ''
    },
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
    source: {
        type: Schema.Types.String,
        default: ''
    },
    createTime: {
        type: Schema.Types.Date,
        default: Date.now
    }
};

const GeneralModel = new Schema(GeneralSchema);

module.exports = mongoose.model('Fighter', GeneralModel);