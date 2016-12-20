
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {type: String, required: true};

const imageSchema = new Schema({
    title: requiredString,
    url: requiredString,
    description: requiredString,
    albumId: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }
});

module.exports = mongoose.model('Image', imageSchema);
