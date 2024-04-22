// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {
        type: String,
        unique: true,
        required: true, 
        trim: true 
    }
});

module.exports = mongoose.model('User', userSchema);
