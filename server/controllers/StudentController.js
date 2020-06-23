var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const Exam = require('../models/ExamModel');
const Student = require('../models/StudentModel');
const StudentExams = require('../models/StudentExamsModel');
const sendMail = require('../email');
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
        console.log(req.body.userId);
        Student.findByIdAndUpdate(req.body.userId, {
          $push: {
            exams: {
              exam: exam.id,
              score: null,
              startedAt: null,
              answers: [],
            },
          },
        })
          .then((result) => {
            res.status(200).json({ examId: exam.id });
          })
          .catch((err) => {
            console.log(err);
            res.status(401).send({ msg: 'already enrolled' });
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
      let decoded = jwt.verify(
        req.headers['x-access-token'],
        process.env.SECRET
      );
      let student = Student.find({ _id: decoded.id });
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

const getExamRules = async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  if (!exam) return res.status(404).send({ msg: 'invalid auth' });
  res.send({
    rules: exam.rules,
    name: exam.name,
    duration: exam.duration,
    endDate: exam.endDate,
  });
};

const studentStartExam = async (req, res) => {
  const studentExam = await StudentExams.findOne({
    studentId: req.body.userId,
    'exams.exam': req.params.id,
  });

  res.send(student);

  // const startedExam = new Date()
  //   .toISOString()
  //   .replace(/T/, ' ')
  //   .replace(/\..+/, '');
  // sendMail(student.email, 'startedExam', {
  //   studentName: student.name,
  //   examName: exam.name,
  //   startedExam,
  //   duration: exam.durationInMins,
  // });
};

const getExamData = async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  if (!exam) return res.status(404).send({ msg: 'invalid auth' });
  res.send(exam);
};

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    school,
    password,
    confirmPassword,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !school ||
    !password ||
    !confirmPassword
  )
    return res.status(401).send({ msg: 'please fill all fields' });
  else if (password !== confirmPassword)
    return res.status(401).send({ msg: 'password does not match' });

  const student = await Student.findOne({ email });

  if (student) return res.status(401).send({ msg: 'email already exist' });

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  try {
    const student = await Student.create({
      firstName,
      lastName,
      email,
      school,
      password: hashedPassword,
    });
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    if (student) {
      const match = await bcrypt.compare(req.body.password, student.password);
      if (match) {
        let token = jwt.sign({ id: student._id }, process.env.SECRET, {
          expiresIn: 86400, // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, student });
      } else {
        res.status(404).send("Couldn't find the student.");
      }
    } else {
      res.status(404).send("Couldn't find the student.");
    }
  } catch (err) {
    console.log(err);
    res.status(404).send("Couldn't find the student.");
  }
};

module.exports = {
  sendAnswers,
  getExamByCode,
  studentStartExam,
  authenticate,
  getExamData,
  register,
  login,
  getExamRules,
};
