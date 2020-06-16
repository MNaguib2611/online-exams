var jwt = require('jsonwebtoken');

const Exam = require('../models/ExamModel');
const Student = require('../models/StudentModel');
const sendMail = require('../email');
const StudentModel = require('../models/StudentModel');
// Student can submit his answers
const sendAnswers = async (req, res) => {
  const studentAnswers = req.body.answers;
  try {
    const exam = await Exam.findOne({ key: req.body.key });
    let score = 0;

    studentAnswers.forEach((studentAnswer) => {
      const isRightAnswer = exam.questions.filter(
        (answer) => answer.correctAnswer == studentAnswer.answer
      );
      if (isRightAnswer) score++;

      // if (studentAnswer.answer === exam.answers[studentAnswer._id]) score++;
    });

    if (!exam) res.status(404).send();
    sendMail(student.email, 'studentScore', {
      studentName: student.name,
      examName: exam.name,
      score: score,
    });

    res.status(200).send({ score });
  } catch (error) {
    res.send(error);
  }
};

const getExamByCode = (req, res) => {
  Exam.findOne({ key: req.body.key }).exec((err, exam) => {
    if (!exam) {
      res.status(404).json({ msg: 'No exam with that code was found' });
    } else {
      if (exam.startDate <= Date.now() && exam.endDate > Date.now()) {
        const student = new Student({
          name: req.body.name,
          email: req.body.email,
          exam: exam._id,
          score: 0,
          startedAt: null,
        });
        student
          .save()
          .then((result) => {
            let token = jwt.sign({ id: result._id }, process.env.SECRET, {
              expiresIn: 86400, // expires in 24 hours
            });
            res.status(200).json({
              exam,
              token,
            });
          })
          .catch((err) =>
            res.status(400).json({ msg: 'you already enrolled for this exam' })
          );
        sendMail(student.email, 'enrolledInExam', {
          studentName: student.name,
          examName: exam.name,
        });
      } else if (exam.startDate > Date.now()) {
        res.status(401).json({ msg: "Exam hasn't started yet" });
      } else {
        res.status(401).json({ msg: 'Exam has already finished' });
      }
    }
  });
};

const authenticate = async (req, res, next) => {
  if (req.headers['x-access-token']) {
    try {
      let decoded = await jwt.verify(
        req.headers['x-access-token'],
        process.env.SECRET
      );
      let student = StudentModel.find({ _id: decoded.id });
      if (student) {
        req.body.userId = decoded.id;
        next();
      } else {
        return res.status(401).send('Not authorized.');
      }
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    }
  } else {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
};

const studentStartExam = (req, res) => {
  Student.findOne({ exam: req.body.exam, email: req.body.email }).exec(
    (err, student) => {
      if (student && student.startedAt === null) {
        Exam.findOne({ _id: req.body.exam }).exec((err, exam) => {
          student.startedAt = Date.now();
          student.save();
          const startedExam = new Date()
            .toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');
          sendMail(student.email, 'startedExam', {
            studentName: student.name,
            examName: exam.name,
            startedExam,
            duration: exam.durationInMins,
          });
          res.status(201).json({ msg: `exam started at ${startedExam}` });
        });
      } else {
        res.status(404).json({ msg: 'something went wrong' });
      }
    }
  );
};

module.exports = {
  sendAnswers,
  getExamByCode,
  studentStartExam,
  authenticate,
};
