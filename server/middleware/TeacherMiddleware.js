const jwt = require('jsonwebtoken');
const Teacher = require('../models/TeacherModel');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, process.env.SECRET);
    const teacher = await Teacher.findOne({ _id: decode._id, 'tokens.token': token });
    if (!teacher) throw Error();
    req.teacher = teacher;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: 'not authorized' });
  }
};

module.exports = auth;
