const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    to: { type: String },
    from: { type: String },
    eventImage: { type: String },
    created_at: {type: Date, required:true },
    updated_at: {type: Date}
});

module.exports = mongoose.model('Event', eventSchema);