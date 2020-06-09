const { Router } = require('express');
const {
  createExam,
  deleteExam,
  updateExam,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/ExamController');
const { sendAnswers } = require('../controllers/StudentController');

const router = new Router();

// Teacher  exam CRUD
router.post('/', createExam);
router.delete('/:id', deleteExam);

router.put('/:id', updateExam);

// Teacher can add question to  exam
router.put('/:id/question', addQuestion);
router.put('/:id/question/:qid', updateQuestion);
router.delete('/:id/question/:qid', deleteQuestion);
// Student can submit exam and get score
router.post('/:id/answers', sendAnswers);

module.exports = router;
