// models/result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'MCQ', required: true },
  correctAnswers: { type: Number, required: true },
});

module.exports = mongoose.model('Result', resultSchema);
