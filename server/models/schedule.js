const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    time: String,
    notes: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
