const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var aboutSchema = new Schema({
    title: {type: String},
    content: {
        para1: {type: String},
        para2: {type: String},
        para3: {type: String},
    },
    created_at: {type: Date, required:true },
    updated_at: {type: Date}
});

module.exports = mongoose.model('About', aboutSchema);