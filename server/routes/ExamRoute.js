const { Router } = require('express');
const {
  createExam,
  deleteExam,
  updateExam,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getExamById,
  listExams,
  getMyExamById,
} = require('../controllers/ExamController');

const { authenticate } = require('../controllers/TeacherController.js');

const router = new Router();

// Teacher  exam CRUD
router.get('/', authenticate, listExams);
router.post('/', authenticate, createExam);
router.get('/:id', getExamById);
router.get('/:id/me', authenticate, getMyExamById);
router.delete('/:id', authenticate, deleteExam);

router.put('/:id', authenticate, updateExam);

// Teacher can add question to  exam
router.put('/:id/question', authenticate, addQuestion);
router.put('/:id/question/:qid', authenticate, updateQuestion);
router.delete('/:id/question/:qid', authenticate, deleteQuestion);
// Student can submit exam and get score

module.exports = router;
