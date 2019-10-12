const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var storySchema = new Schema({ 
    storyTitle: {type: String},
    storyImages: [String], 
    created_at: {type: Date, required:true },
    updated_at: {type: Date} 
});

module.exports = mongoose.model('Story', storySchema);