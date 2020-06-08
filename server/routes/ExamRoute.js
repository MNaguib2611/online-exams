const { Router } = require('express');
const uniqid = require('uniqid');

const Exam = require('./../models/ExamModel');

const router = new Router();

router.get('/', (req, res) => {});

// Teacher can create exam
router.post('/', async (req, res) => {
  const { rules, startDate, endDate, name } = req.body;
  const exam = new Exam({
    key: uniqid(),
    startDate,
    endDate,
    rules,
    name,
  });
  try {
    await exam.save();
    res.status(201).send(exam);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Teacher can add question to  exam
router.patch('/:id/question', async (req, res) => {
  const { question, answers, correctAnswer } = req.body;
  if (!question || !answers.length || !correctAnswer) {
    return res.status(400).send({ message: 'please fill all fields' });
  }
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          questions: {
            answers: answers,
            questionStatement: question,
            correctAnswer: correctAnswer,
          },
        },
      },
      { new: true }
    );
    if (!exam) return res.status(404).send();

    res.status(201).send(exam);
  } catch (error) {
    res.send(error);
  }
});

// Student can submit exam and get score
router.post('/:id/answers', async (req, res) => {
  const studentAnswers = req.body.answers;
  try {
    const exam = await Exam.findById(req.params.id);
    let score = 0;

    studentAnswers.forEach(studentAnswer => {
      const isRightAnswer = exam.questions.filter(
        answer => answer.correctAnswer == studentAnswer.answer
      );
      // if (studentAnswer.answer === exam.answers[studentAnswer._id]) score++;
    });

    if (!exam) res.status(404).send();
    res.status(200).send({ score });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
