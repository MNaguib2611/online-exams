var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const Exam = require('../models/ExamModel');
const Student = require('../models/StudentModel');
const sendMail = require('../email');
const { response } = require('express');

const sendAnswers = async (req, res) => {
  const studentAnswers = req.body.answers;
  try {
    const exam = await Exam.findById(req.params.id);

    const student = await Student.findById(req.body.userId);

    const studentExam = student.exams.find(
      (exam) => String(exam.examId) === String(req.params.id)
    );

    if (!studentExam)
      return res.status(400).send({ msg: 'you are not enrolled to this exam' });

    if (studentExam.score)
      return res.status(400).send({ msg: 'you did this exam before ' });

    const examDuration = exam.duration;
    const isExpired =
      new Date(studentExam.startedAt.getTime() + examDuration * 60 * 1000) -
      new Date();
    if (isExpired <= 0)
      return res.status(400).send({ msg: 'exam duration expired' });

    let score = 0;

    studentAnswers.forEach((studentAnswer) => {
      const isRightAnswer = exam.questions.filter(
        (answer) => answer.correctAnswer == studentAnswer.answer
      );
      if (isRightAnswer.length) score++;
    });

    studentExam.score = score;
    studentExam.percentage = (100 * score) / exam.questions.length;
    studentExam.answers = studentAnswers;
    studentExam.passed =
      studentExam.percentage >= exam.successPercent ? true : false;
    await student.save();

    sendMail(student.email, 'studentScore', {
      studentName: student.firstName,
      examName: exam.name,
      score: score,
    });

    res.status(200).send();
  } catch (error) {
    console.log(error);

    res.status(400).send(error);
  }
};

const getExamByCode = (req, res) => {
  Exam.findOne({ key: req.body.key }).exec(async (err, exam) => {
    if (!exam) {
      return res.status(404).json({ msg: 'No exam with that code was found' });
    }
    if( exam.questions.length === 0 ){
      return res.status(404).json({ msg: 'Exam has no questions yet.' });
    }
    if (exam.startDate <= Date.now() && exam.endDate > Date.now()) {
      const student = await Student.findById(req.body.userId);
      const isEnrolled = student.exams.find(
        (examItem) => String(examItem.examId) === String(exam._id)
      );

      if (isEnrolled) return res.status(401).send({ msg: 'already enrolled' });

      Student.findByIdAndUpdate(
        req.body.userId,
        {
          $push: {
            exams: {
              examId: exam.id,
              name: exam.name,
              score: null,
              startedAt: null,
              answers: [],
            },
          },
        },
        { runValidators: true }
      )
        .then((result) => {
          res.status(200).json({ examId: exam.id });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (exam.startDate > Date.now()) {
      res.status(401).json({ msg: "Exam hasn't started yet" });
    } else {
      res.status(401).json({ msg: 'Exam has already finished' });
    }
  });
};

// *******************************************
// ***************************************
// **********************************
// *******************************
// *****************************
// ****************************
// ***************************

const updateProfie = async (req, res) => {
  const student = await Student.findById(req.body.userId);
  if (!student) return res.status(404).send({ msg: 'Student was not found' });
  if (req.body.password) {
    const hasshedPassword = await bcrypt.hashSync(req.body.password, 8);
    student.password = hasshedPassword;
  }
  student.firstName = req.body.firstName;
  student.lastName = req.body.lastName;
  student.email = req.body.email;
  student.school = req.body.school;
  student.grade = req.body.grade;
  student.save();
  return res.status(200).send({ msg: 'your account has been updated' });
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
    return res.status(401).send({ auth: false, message: 'No token provided.' });
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
  const student = await Student.findById(req.body.userId);
  const studentExam = student.exams.find(
    (exam) => String(exam.examId) === String(req.params.id)
  );
  if (!studentExam)
    return res.status(400).send({ msg: 'you are not enrolled to this exam' });

  if (studentExam.score)
    return res.status(400).send({ msg: 'you did this exam before ' });

  const exam = await Exam.findById(req.params.id);

  if (studentExam.startedAt) {
    const examDuration = exam.duration;
    const isExpired =
      new Date(studentExam.startedAt.getTime() + examDuration * 60 * 1000) -
      new Date();
    if (isExpired <= 0)
      return res.status(401).send({ msg: 'exam duration expired' });
  } else {
    studentExam.startedAt = Date.now();
    await student.save();
  }

  res.send({ exam, studentExam });
  // res.send(student);

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

const getExamScore = async (req, res) => {
  const student = await Student.findById(req.body.userId);
  const exam = await Exam.findById(req.params.id);
  const studentExam = student.exams.find(
    (exam) => String(exam.examId) === String(req.params.id)
  );

  if (!studentExam || studentExam.score === null) {
    return res.status(404).send({ msg: 'no exam found!' });
  }

  const answers = exam.questions.map((question) => ({
    id: question._id,
    questionStatement: question.questionStatement,
    correctAnswer: question.correctAnswer,
    studentAnswer: studentExam.answers.find(
      (answer) => String(answer._id) === String(question._id)
    ).answer,
  }));

  res.send({
    examData: {
      name: exam.name,
      score: studentExam.score,
      startedAt: studentExam.startedAt,
      percentage: studentExam.percentage,
      passed: studentExam.passed,
      showAnswers: exam.showAnswers,
    },
    answers,
  });
};

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    school,
    grade,
    password,
    confirmPassword,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !school ||
    !grade ||
    !password ||
    !confirmPassword
  )
    return res.status(400).send({ msg: 'please fill all fields' });
  else if (password !== confirmPassword)
    return res.status(400).send({ msg: 'password does not match' });

  const student = await Student.findOne({ email });

  if (student) return res.status(400).send({ msg: 'email already exist' });

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const verificationCode = uniqid();
  try {
    const student = await Student.create({
      firstName,
      lastName,
      email,
      grade,
      school,
      password: hashedPassword,
      verificationCode,
    });
    sendMail(student.email, 'accountVerification', {
      name: student.firstName,
      code: student.verificationCode,
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
    res.status(404).send("Couldn't find the student.");
  }
};

const getProfile = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    school,
    grade,
    isVerified,
  } = await Student.findById(req.body.userId);
  res.send({
    email,
    firstName,
    lastName,
    school,
    grade,
    isVerified,
  });
};

const verify = async (req, res) => {
  const verificationCode = req.body.verificationCode;
  const student = await Student.findById(req.body.userId);

  if (verificationCode !== student.verificationCode) {
    return res.status(400).send({ msg: 'invalid verification code' });
  }

  student.isVerified = true;
  await student.save();

  res.send();
};

const getExamCorrectAnswers = async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  let examAnswers = {};
  exam.questions.map((question) => {
    examAnswers[question._id] = question.correctAnswer;
  });
  res.send({ examAnswers });
};

const myEnrolledExams = async (req, res) => {
  try {
    const student = await Student.findById(req.body.userId);
    const myExams = student.exams.filter((exam) => exam.score !== null);
    res.send({ myExams });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const changePassword = async (req, res) => {
  const resetCode = uniqid();
  const student = await Student.findOne({
    email: req.body.email,
  });
  if (!student) {
    return res.status(404).send({ msg: 'Student was not found' });
  }
  student.resetPassCode = resetCode;
  student.save();

  sendMail(student.email, 'resetPassword', {
    name: student.firstName,
    code: student.resetPassCode,
  });
  return res.status(200).send({ msg: 'Password reset request was recieved' });
};

const resetPassword = async (req, res) => {
  const student = await Student.findOne({
    email: req.body.email,
  });
  if (!student) {
    return res.status(404).send({ msg: 'Student was not found' });
  }
  if (student.resetPassCode == req.body.code) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    student.password = hashedPassword;
    student.save();
    return res.status(200).send({ msg: 'your password has been reset' });
  } else {
    return res.status(400).send({ msg: 'Incorrect code' });
  }
};

module.exports = {
  sendAnswers,
  getExamByCode,
  studentStartExam,
  authenticate,
  getExamData,
  getExamCorrectAnswers,
  register,
  login,
  getExamRules,
  myEnrolledExams,
  getExamScore,
  getProfile,
  changePassword,
  resetPassword,
  updateProfie,
  verify,
};
