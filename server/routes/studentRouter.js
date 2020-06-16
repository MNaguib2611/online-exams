const { Router } = require('express');
const {
  getExamByCode,
  studentStartExam,
  authenticate,
  sendAnswers,
} = require('../controllers/StudentController');

const router = new Router();

router.post('/answers', authenticate, sendAnswers);

router.post('/enroll', getExamByCode);

router.patch('/startExam', authenticate, studentStartExam);

module.exports = router;
