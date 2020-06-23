const { Router } = require('express');
const {
  getExamByCode,
  studentStartExam,
  authenticate,
  sendAnswers,
  getExamData,
  register,
  login,
  getExamRules,
} = require('../controllers/StudentController');

const router = new Router();

router.post('/register', register);
router.post('/login', login);

router.get('/examData', authenticate, getExamData);
router.get('/examRules/:id', authenticate, getExamRules);
router.post('/answers', authenticate, sendAnswers);

router.post('/enroll', authenticate, getExamByCode);

router.patch('/startExam', authenticate, studentStartExam);

module.exports = router;
