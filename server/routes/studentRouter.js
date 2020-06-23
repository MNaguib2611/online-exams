const { Router } = require('express');
const {
  getExamByCode,
  studentStartExam,
  authenticate,
  sendAnswers,
  getExamData,
  register,
  login,
} = require('../controllers/StudentController');

const router = new Router();

router.post('/register', register);
router.post('/login', login);

router.get('/examData', authenticate, getExamData);
router.post('/answers', authenticate, sendAnswers);

router.post('/enroll', getExamByCode);

router.patch('/startExam', authenticate, studentStartExam);

module.exports = router;
