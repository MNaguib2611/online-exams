const uniqid = require('uniqid');
const Exam = require('../models/ExamModel');

// Teacher can create exam
exports.createExam = async (req, res) => {
  const { rules, startDate, endDate, name } = req.body;

  if (rules.length && startDate && endDate && name) {
    const exam = new Exam({
      key: uniqid(),
      startDate,
      endDate,
      rules,
      name,
    });
    try {
      await exam.save();
      return res.status(201).send(exam);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  res.status(400).send(error);
};

// Teacher can delete exam
exports.deleteExam = (req, res) => {
  Exam.findByIdAndDelete(req.params.id, (err, exam) => {
    if (err) return res.status(500).send(err);
    else if (!exam) return res.status(404).send({ msg: 'exam not found!' });
    res.send({ msg: 'exam deleted' });
  });
};

// Teacher can update exam
exports.updateExam = (req, res) => {
  Exam.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, exam) => {
      if (err) return res.status(500).send(err);
      else if (!exam) return res.status(404).send({ msg: 'exam not found!' });
      res.send(exam);
    }
  );
};

// Teacher exams' question CRUD
exports.addQuestion = (req, res) => {
  const { question, answers, correctAnswer } = req.body;
  if (!question || !answers.length || !correctAnswer) {
    return res.status(400).send({ message: 'please fill all fields' });
  }
  Exam.findByIdAndUpdate(
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
    { new: true },
    (err, exam) => {
      if (err) return res.status(500).send(err);
      else if (!exam) return res.status(404).send();
      res.send(exam);
    }
  );
};

exports.updateQuestion = (req, res) => {
  Exam.findById(req.params.id, (err, exam) => {
    if (err) return res.status(500).send(err);
    else if (!exam) return res.status(404).send();
    const question = exam.questions.id(req.params.qid);
    question.answers = req.body.answers || question.answers;
    question.questionStatement =
      req.body.question || question.questionStatement;
    question.correctAnswer = req.body.correctAnswer || question.correctAnswer;
    exam
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
};

exports.deleteQuestion = (req, res) => {
  Exam.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { questions: { _id: req.params.qid } },
    },
    { new: true },
    (err, exam) => {
      if (err) return res.status(500).send(err);
      else if (!exam) return res.status(404).send();
      res.send({ msg: 'question deleted' });
    }
  );
};
