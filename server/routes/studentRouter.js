const { Router } = require('express');
const {
  getExamByCode,
  studentStartExam,
  authenticate,
  sendAnswers,
  getExamData,
} = require('../controllers/StudentController');

const router = new Router();

router.get('/examData', authenticate, getExamData);
router.post('/answers', authenticate, sendAnswers);

router.post('/enroll', getExamByCode);

router.patch('/startExam', authenticate, studentStartExam);

module.exports = router;
