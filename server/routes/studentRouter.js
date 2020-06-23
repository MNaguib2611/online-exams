const { Router } = require('express');
const {
  getExamByCode,
  studentStartExam,
  authenticate,
  sendAnswers,
  getExamData,
  getExamCorrectAnswers,
  register,
  login,
  getExamRules,
} = require('../controllers/StudentController');

const router = new Router();

router.post('/register', register);
router.post('/login', login);

router.get('/examData', authenticate, getExamData);
router.get('/examRules/:id', authenticate, getExamRules);
router.post('/exams/:id/answers/', authenticate, sendAnswers);

router.post('/enroll', authenticate, getExamByCode);

router.patch('/startExam/:id', authenticate, studentStartExam);

router.get('/getExamCorrectAnswers/:id', getExamCorrectAnswers);





module.exports = router;
