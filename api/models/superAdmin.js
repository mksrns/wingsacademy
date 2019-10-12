const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var superAdminSchema = new Schema({
    name: {
        firstname: {type: String, required: true},
        lastname: {type: String}
    },
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true }
});

module.exports = mongoose.model('SuperAdmin', superAdminSchema);