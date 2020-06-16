const uniqid = require('uniqid');
const Exam = require('../models/ExamModel');

// Teacher can create exam
exports.createExam = async (req, res) => {
  const { userId, rules, startDate, endDate, name } = req.body;

  if (rules.length && startDate && endDate && name && userId) {
    const exam = new Exam({
      teacher: userId,
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
exports.deleteExam = async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) return res.status(404).send({ msg: 'exam not found!' });
  else if (exam.teacher != req.body.userId)
    return res.status(401).send({ msg: 'you can not delete this exam' });

  exam.remove((err, exam) => {
    if (err) return res.status(500).send(err);
    res.send({ msg: 'exam deleted' });
  });
};

// Teacher can update exam
exports.updateExam = async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) return res.status(404).send({ msg: 'exam not found!' });
  else if (exam.teacher != req.body.userId)
    return res.status(401).send({ msg: 'you can not update this exam' });

  exam.update(req.body, (err, exam) => {
    if (err) return res.status(500).send(err);
    res.send({ msg: 'exam updated' });
  });
};

// Teacher exams' question CRUD
exports.addQuestion = async (req, res) => {
  const { question, answers, correctAnswer } = req.body;
  if (!question || !answers.length || !correctAnswer) {
    return res.status(400).send({ message: 'please fill all fields' });
  }

  const exam = await Exam.findById(req.params.id);

  if (!exam) return res.status(404).send({ msg: 'exam not found!' });
  else if (exam.teacher != req.body.userId)
    return res.status(401).send({ msg: 'you can not update this exam' });

  exam.update(
    {
      $push: {
        questions: {
          answers: answers,
          questionStatement: question,
          correctAnswer: correctAnswer,
        },
      },
    },
    (err, exam) => {
      if (err) return res.status(500).send(err);
      res.send({ msg: 'question added' });
    }
  );
};

exports.updateQuestion = async (req, res) => {
  if (!question || !answers.length || !correctAnswer) {
    return res.status(400).send({ message: 'please fill all fields' });
  }

  const exam = await Exam.findById(req.params.id);

  if (!exam) return res.status(404).send({ msg: 'exam not found!' });
  else if (exam.teacher != req.body.userId)
    return res.status(401).send({ msg: 'you can not update this exam' });

  const question = exam.questions.id(req.params.qid);
  question.answers = req.body.answers || question.answers;
  question.questionStatement = req.body.question || question.questionStatement;
  question.correctAnswer = req.body.correctAnswer || question.correctAnswer;
  exam
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });

  exam.update(
    {
      $push: {
        questions: {
          answers: answers,
          questionStatement: question,
          correctAnswer: correctAnswer,
        },
      },
    },
    (err, exam) => {
      if (err) return res.status(500).send(err);
      res.send({ msg: 'question added' });
    }
  );

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
