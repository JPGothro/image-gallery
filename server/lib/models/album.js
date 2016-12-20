
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {type: String, required: true};

const albumSchema = new Schema({
    title: requiredString,
    description: String
});

module.exports = mongoose.model('Album', albumSchema);
