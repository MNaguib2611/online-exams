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
    questions: [{questionAnswers: [ {type: String}],correctAnswer:String, questionStatement: String } ],
   

});



ExamSchema.methods.toJSON = function() {
    const obj = this.toObject();
    obj.questions.forEach(question => {
        delete question.correctAnswer;
    });
    return obj;
   }
const ExamModel = mongoose.model('Exam', ExamSchema);

module.exports = ExamModel;
