const mongoose = require("mongoose");

const ExamSchema = mongoose.Schema({
    teacher: { 
        type: 'ObjectId', 
        ref: 'Teacher', 
        required: true,
    },
    
    key: {
        type: String, 
        unique : true, 
        required: true,
        minlength: 8
    },
    startDate: {
        type: Date, 
        required: true,
    },
    endDate: {
        type: Date, 
        required: true,
    },
    rules: [{type: String}],
    questions: [{questionAnswers: [{answers: String, correctAnswer: Boolean}], questionStatement: String } ],
});

const ExamModel = mongoose.model('Exam', ExamSchema);

module.exports = ExamModel;