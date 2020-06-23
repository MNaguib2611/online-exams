var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const Exam = require('../models/ExamModel');
const Student = require('../models/StudentModel');
const sendMail = require('../email');

const sendAnswers = async (req, res) => {
  const studentAnswers = req.body.answers;
  try {
    const exam = await Exam.findById(req.params.id);

    const student = await Student.findById(req.body.userId);

    const studentExam = student.exams.find(
      (exam) => String(exam.examId) === String(req.params.id)
    );

    if (!studentExam)
      return res.status(401).send({ msg: 'you are not enrolled to this exam' });

    console.log(studentExam);
    let score = 0;

    studentAnswers.forEach((studentAnswer) => {
      const isRightAnswer = exam.questions.filter(
        (answer) => answer.correctAnswer == studentAnswer.answer
      );
      if (isRightAnswer.length) score++;
    });

    studentExam.score = score;
    studentExam.percentage = (100 * score) / exam.questions.length;
    await student.save();
    const passed = studentExam.percentage >= exam.successPercent ? true : false;

    sendMail(student.email, 'studentScore', {
      studentName: student.name,
      examName: exam.name,
      score: score,
    });
    res.status(200).send({ score, percentage, passed });
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
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
              examId: exam.id,
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
  const student = await Student.findById(req.body.userId);
  console.log(student.exams);
  const isEnrolled = student.exams.find(
    (exam) => String(exam.examId) === String(req.params.id)
  );
  if (!isEnrolled)
    return res.status(401).send({ msg: 'you are not enrolled to this exam' });

  if (isEnrolled.score)
    return res.status(401).send({ msg: 'you did this exam before ' });

  const exam = await Exam.findById(req.params.id);

  if (isEnrolled.startedAt) {
    const examDuration = exam.duration;
    const isExpired =
      new Date(isEnrolled.startedAt.getTime() + examDuration * 60 * 1000) -
      new Date();
    if (isExpired <= 0)
      return res.status(401).send({ msg: 'exam duration expired' });
  }
  isEnrolled.startedAt = Date.now();
  await student.save();

  res.send(exam);
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


const getExamCorrectAnswers = async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  let examAnswers={}
  exam.questions.map( (question)=>{
    examAnswers[question._id] = question.correctAnswer
  })
  res.send({ examAnswers });
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
};
