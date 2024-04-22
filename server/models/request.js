// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    adminResponse: {
        type: String
    }
}, { timestamps: true });


const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
