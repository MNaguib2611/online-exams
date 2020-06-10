const mongoose = require('mongoose');

const ExamSchema = mongoose.Schema(
  {
    teacher: {
      type: 'ObjectId',
      ref: 'Teacher',
      // required: true,
    },
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      unique: true,
      required: true,
      minlength: 8,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    rules: [{ type: String }],
    questions: [
      {
        answers: [{ type: String }],
        questionStatement: String,
        correctAnswer: String,
      },
    
    ],
    durationInMins: Number,
    // answers:{
    //     "5edd84107b1a6069cbddc465":"islam"
    // }
  },
  { timestamps: true }
);



ExamSchema.methods.toJSON = function() {
    const obj = this.toObject();
    obj.questions.forEach(question => {
        delete question.correctAnswer;
    });
    return obj;
   }
const ExamModel = mongoose.model('Exam', ExamSchema);

module.exports = ExamModel;
