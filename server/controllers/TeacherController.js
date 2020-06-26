const uniqid = require('uniqid');
const TeacherModel = require('../models/TeacherModel.js');
const StudentModel = require('../models/StudentModel.js');
const Student = require('../models/StudentModel');
const sendMail = require('../email');

const TeacherController = {};

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

TeacherController.register = async (req, res) => {
  var hasshedPassword = await bcrypt.hashSync(req.body.password, 8);
  try {
    const verificationCode = uniqid();

    const teacher = await TeacherModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hasshedPassword,
      verificationCode,
    });

    sendMail(teacher.email, 'accountVerification', {
      name: teacher.name,
      code: teacher.verificationCode,
    });

    res.status(201).send('Registered Successfully');
  } catch (err) {
    console.log('error in register a teacher.');
    console.log(err);
    res
      .status(500)
      .send(
        'There was a problem registering the user,please check all inputs. '
      );
  }
};

// *******************************************
// ***************************************
// **********************************
// *******************************
// *****************************
// ****************************
// ***************************

TeacherController.updateProfie = async (req, res) => {
  const teacher = await TeacherModel.findById(req.body.userId);
  if (!teacher) return res.status(404).send({ msg: 'Teacher was not found' });
  if (req.body.password) {
    const hasshedPassword = await bcrypt.hashSync(req.body.password, 8);
    teacher.password = hasshedPassword;
  }
  teacher.name = req.body.name;
  teacher.email = req.body.email;
  console.log('teacher', teacher);
  await teacher.save();
  return res.status(200).send({ msg: 'your account has been updated' });
};

TeacherController.login = async (req, res) => {
  try {
    if (req.body.loginMethod === 'facebook') {
      await TeacherController.loginWithFaceBook(req, res);
    } else if (req.body.loginMethod == 'google') {
      await TeacherController.loginWithGoogle(req, res);
    } else {
      const Teacher = await TeacherModel.findOne({ email: req.body.email });
      if (Teacher.facebookID) {
        console.log('Teacher Did not create a password, logged with facebook');
        res
          .status(409)
          .send('You seem to have logged with your facebook acount.');
      } else if (Teacher.googleID) {
        console.log('Teacher Did not create a password, logged with facebook');
        res
          .status(409)
          .send('You seem to have logged with your facebook acount.');
      } else if (Teacher) {
        const match = await bcrypt.compare(req.body.password, Teacher.password);
        if (match) {
          await TeacherController.generateToken(Teacher, res);
        } else {
          res.status(404).send("Couldn't find the Teacher.");
        }
      } else {
        res.status(404).send("Couldn't find the Teacher.");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).send("Couldn't find the Teacher.");
  }
};

TeacherController.logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

TeacherController.authenticate = async (req, res, next) => {
  if (req.headers['x-access-token']) {
    try {
      let decoded = await jwt.verify(
        req.headers['x-access-token'],
        process.env.SECRET
      );
      let Teacher = TeacherModel.find({ _id: decoded.id });
      if (Teacher) {
        req.body.userId = decoded.id;
        next();
      } else {
        return res.status(404).send('No user found.');
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

TeacherController.getProfile = async (req, res) => {
  const { email, name, isVerified } = await TeacherModel.findById(
    req.body.userId
  );
  res.send({
    email,
    name,
    isVerified,
  });
};

TeacherController.getExamStatus = async (req, res) => {
  let Students = await StudentModel.find({ exam: req.params.id })
    .where('score')
    .ne(null)
    .sort({ _id: -1 })
    .limit(15);
  res.status(200).send(Students);
};

TeacherController.sendInvitation = async (req, res) => {
  const { examName, examKey, school, grade } = req.body;
  if (!examKey || !examName || !school || !grade) {
    return res.status(403).send({ msg: 'please fill all fields' });
  }

  const students = await Student.find({ school, grade });
  students.forEach((student) => {
    console.log(student);
    sendMail(student.email, 'examInvitation', {
      studentName: student.firstName,
      examName,
      examKey,
    });
  });
  res.send(students);
};

TeacherController.loginWithFaceBook = async (req, res) => {
  let Teacher = await TeacherModel.findOne({
    email: req.body.email,
    facebookID: req.body.facebookID,
  });
  if (Teacher) {
    await TeacherController.generateToken(Teacher, res);
  } else {
    Teacher = new TeacherModel();
    console.log('Teacher Register ', Teacher);
    Teacher.name = req.body.name;
    Teacher.email = req.body.email;
    Teacher.facebookID = req.body.facebookID;
    Teacher.save();
    await TeacherController.generateToken(Teacher, res);
  }
};

TeacherController.verify = async (req, res) => {
  const verificationCode = req.body.verificationCode;
  const teacher = await TeacherModel.findById(req.body.userId);

  if (verificationCode !== teacher.verificationCode) {
    return res.status(400).send({ msg: 'invalid verification code' });
  }

  teacher.isVerified = true;
  await teacher.save();

  res.send();
};

TeacherController.loginWithGoogle = async (req, res) => {
  let Teacher = await TeacherModel.findOne({
    email: req.body.email,
    googleID: req.body.googleID,
  });
  if (Teacher) {
    await TeacherController.generateToken(Teacher, res);
  } else {
    Teacher = new TeacherModel();
    Teacher.name = req.body.name;
    Teacher.email = req.body.email;
    Teacher.googleID = req.body.googleID;
    Teacher.save();
    await TeacherController.generateToken(Teacher, res);
  }
};

TeacherController.generateToken = async (teacher, response) => {
  let token = jwt.sign({ id: teacher._id }, process.env.SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
  response.status(200).send({ auth: true, token: token });
};

TeacherController.changePassword = async (req, res) => {
  const resetCode = uniqid();
  const teacher = await TeacherModel.findOne({
    email: req.body.email,
  });
  if (!teacher) {
    return res.status(404).send({ msg: 'Teacher was not found' });
  }
  teacher.resetPassCode = resetCode;
  teacher.save();
  teacher.save();
  sendMail(teacher.email, 'resetPassword', {
    name: teacher.name,
    code: teacher.resetPassCode,
  });
  return res.status(200).send({ msg: 'Password reset request was recieved' });
};

TeacherController.resetPassword = async (req, res) => {
  const teacher = await TeacherModel.findOne({
    email: req.body.email,
  });
  if (!teacher) {
    return res.status(404).send({ msg: 'Teacher was not found' });
  }
  if (teacher.resetPassCode == req.body.code) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    teacher.password = hashedPassword;
    teacher.save();
    return res.status(200).send({ msg: 'your password has been reset' });
  } else {
    return res.status(403).send({ msg: 'Incorrect code' });
  }
};

module.exports = TeacherController;
