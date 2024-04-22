const mongoose = require('mongoose');

const mcqSchema = new mongoose.Schema({
    name: String, 
    questions: [
        {
            question: String,
            options: [String],
            correctAnswer: String
        }
    ]
});

const MCQ = mongoose.model('MCQ', mcqSchema);

module.exports = MCQ;
