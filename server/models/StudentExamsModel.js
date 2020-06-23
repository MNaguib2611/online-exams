const mongoose = require('mongoose');

const StudentExamsSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Student',
    },
    exams: [
      {
        exam: { type: 'ObjectId', ref: 'Exam', unique: true },
        score: Number,
        startedAt: Date,
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

// StudentSchema.index({ email: 1, exam: 1 }, { unique: true });
const StudentExamsModel = mongoose.model('StudentExams', StudentExamsSchema);

module.exports = StudentExamsModel;
