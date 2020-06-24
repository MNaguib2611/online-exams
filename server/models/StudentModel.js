const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      match: [
        /^([\w\.]*)(@)([\w\.]*)?(.com)$/,
        'Please fill a valid email address',
      ],
      // unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
      minlength: 8,
    },
    school: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    resetPassCode:String,
    exams: [
      {
        examId: { type: 'ObjectId', ref: 'Exam' },
        name: String,
        score: Number,
        startedAt: Date,
        percentage: Number,
        passed: Boolean,
        answers: [
          {
            questionId: mongoose.SchemaTypes.ObjectId,
            answer: mongoose.SchemaTypes.String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

StudentSchema.index({ email: 1, exam: 1 }, { unique: true });
const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;
