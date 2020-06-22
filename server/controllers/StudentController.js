var jwt = require('jsonwebtoken');

const Exam = require('../models/ExamModel');
const Student = require('../models/StudentModel');
const sendMail = require('../email');
const StudentModel = require('../models/StudentModel');
const { reset } = require('nodemon');
// Student can submit his answers
const sendAnswers = async (req, res) => {
  const studentAnswers = req.body.answers;
  try {
    const exam = await Exam.findById(req.body.examId);

    const student = await Student.findById(req.body.userId);
    if (!student) return res.status(404).send();

    if (student.score !== null) {
      return res.status(401).send({ msg: 'you did this exam before' });
    }
    if (student.mustSubmitBefore < Date.now()) {
      return res.status(401).send({ msg: 'you have exceeded the time limit' });
    }
    let score = 0;

    studentAnswers.forEach((studentAnswer) => {
      const isRightAnswer = exam.questions.filter(
        (answer) => answer.correctAnswer == studentAnswer.answer
      );
      if (isRightAnswer.length) score++;
    });

    student.score = score;
    student.percentage = (100*score)/exam.questions.length
    student.submittedAt=Date.now();
    await student.save();
    sendMail(student.email, 'studentScore', {
      studentName: student.name,
      examName: exam.name,
      score: score,
    });
    res.status(200).send({ score,percentage });
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
          score: null,
          startedAt: null,
        });
        student
          .save()
          .then((result) => {
            console.log(exam);
            let token = jwt.sign(
              { studentId: result._id, examId: exam.id },
              process.env.SECRET,
              {
                expiresIn: 86400, // expires in 24 hours
              }
            );
            res.status(200).json({
              token,
            });
            sendMail(student.email, 'enrolledInExam', {
              studentName: student.name,
              examName: exam.name,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ msg: 'you already enrolled for this exam' });
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
      let student = StudentModel.find({ _id: decoded.studentId });
      if (student) {
        req.body.userId = decoded.studentId;
        req.body.examId = decoded.examId;
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
  Student.findOne({ exam: req.body.examId, _id: req.body.userId }).exec(
    (err, student) => {
      if (student && student.startedAt === null) {
        Exam.findOne({ _id: req.body.examId }).exec((err, exam) => {
          let startTime = new Date();
          student.startedAt =startTime
          student.mustSubmitBefore =new Date(startTime.getTime() + 60000*exam.duration+10000);
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
          res.status(201).json({ msg: `exam started at ${startedExam}`,exam:exam });
        });
      } else {
        res.status(404).json({ msg: 'something went wrong' });
      }
    }
  );
};

const getExamData = async (req, res) => {
  let exam = await Exam.findById(req.body.examId);
  const student = await Student.findById(req.body.userId);

  if (!exam || !student) return res.status(404).send({ msg: 'invalid auth' });
  if (student.startedAt===null) {
    console.log("here",student.startedAt);
    exam = {"rules":exam.rules,"duration":exam.duration,"endDate":exam.endDate}
  }
  res.send({ exam, student });
};

module.exports = {
  sendAnswers,
  getExamByCode,
  studentStartExam,
  authenticate,
  getExamData,
};
