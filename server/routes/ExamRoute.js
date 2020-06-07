const { Router } = require('express');
const uniqid = require('uniqid');

const Exam = require('./../models/ExamModel');

const router = new Router();

router.get('/', (req, res) => {});

router.post('/create', async (req, res) => {
  const { rules, startDate, endDate } = req.body;
  const exam = new Exam({
    key: uniqid(),
    startDate,
    endDate,
    rules,
  });
  try {
    await exam.save();
    res.status(201).send(exam);
  } catch (error) {
    res.send(error);
  }
});

router.post('/:id/question', async(req, res) => {
    const {question, answers, correctAnswer} = req.body;
    const exam = await Exam.findByIdAndUpdate({
        
    })
    if(exam){
        exam.updat
    }
});

module.exports = router;
