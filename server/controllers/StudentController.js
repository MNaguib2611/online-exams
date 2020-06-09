const Exam = require('../models/ExamModel');

// Student can submit his answers
exports.sendAnswers = async (req, res) => {
  const studentAnswers = req.body.answers;
  try {
    const exam = await Exam.findById(req.params.id);
    let score = 0;

    studentAnswers.forEach(studentAnswer => {
      const isRightAnswer = exam.questions.filter(
        answer => answer.correctAnswer == studentAnswer.answer
      );
      if (isRightAnswer) score++;

      // if (studentAnswer.answer === exam.answers[studentAnswer._id]) score++;
    });

    if (!exam) res.status(404).send();
    res.status(200).send({ score });
  } catch (error) {
    res.send(error);
  }
};
