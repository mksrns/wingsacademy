const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var adminSchema = new Schema({
    name: {
        firstname: {type: String, required: true},
        lastname: {type: String}
    },
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    role: {type: String },
    created_at: {type: Date, required:true },
    updated_at: {type: Date}
});

module.exports = mongoose.model('Admin', adminSchema);