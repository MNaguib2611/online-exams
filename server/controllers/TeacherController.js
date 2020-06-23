const TeacherModel = require('../models/TeacherModel.js');
const StudentModel = require('../models/StudentModel.js');
const TeacherController = {};

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

TeacherController.register = async (req, res) => {
  var hasshedPassword = await bcrypt.hashSync(req.body.password, 8);
  try {
    const Teacher = await TeacherModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hasshedPassword,
    });
    console.log('Teacher created: ');
    console.log(Teacher);

    res.status(200).send('Registered Successfully');
    // res.send(Teacher);
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

TeacherController.login = async (req, res) => {
  try {
    if (req.body.loginMethod === 'facebook') {
      await TeacherController.loginWithFaceBook(req, res);
    } else {
      const Teacher = await TeacherModel.findOne({ email: req.body.email });
      if (Teacher.facebookID) {
        console.log('Teacher Did not create a password, logged with facebook');
        res
          .status(409)
          .send('You seem to have logged with your facebook acount.');
      } else if (Teacher) {
        const match = await bcrypt.compare(req.body.password, Teacher.password);
        if (match) {
          let token = jwt.sign({ id: Teacher._id }, process.env.SECRET, {
            expiresIn: 86400, // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token });
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

TeacherController.getExamStatus = async (req, res) => {
  let Students = await StudentModel.find({ exam: req.params.id })
    .where('score')
    .ne(null)
    .sort({ _id: -1 })
    .limit(15);
  res.status(200).send(Students);
};

TeacherController.loginWithFaceBook = async (req, res) => {
  let Teacher = await TeacherModel.findOne({
    email: req.body.email,
    facebookID: req.body.facebookID,
  });
  console.log(Teacher);

  if (Teacher) {
    let token = jwt.sign({ id: Teacher._id }, process.env.SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    console.log('Teacher Login ', Teacher);
    res.status(200).send({ auth: true, token: token });
  } else {
    Teacher = new TeacherModel();
    console.log('Teacher Register ', Teacher);
    Teacher.name = req.body.name;
    Teacher.email = req.body.email;
    Teacher.facebookID = req.body.facebookID;
    Teacher.save();
    let token = jwt.sign({ id: Teacher._id }, process.env.SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  }
};
module.exports = TeacherController;
