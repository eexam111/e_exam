// notice.js (Model)
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('Notice', noticeSchema);
