const express = require('express');
const router = express.Router();
const Exam = require('../models/ExamModel');



router.get("/getExamByCode", (req, res) => {
    Exam.findOne({key:req.body.key}).exec((err, exam) => {
        res.json(exam);
      });
})



function getModelAnswers(questions) {
    const answers ={};
    questions.forEach(question => {
        answers[question.questionStatement] = question.correctAnswer
 });  
 return answers
}

function checkAnswers(studentAnswers,modelAnswer) {
    console.log(studentAnswers);
    
    let grade = 0;
    Object.keys(studentAnswers).forEach(studentAnswer => {
        console.log(studentAnswers[studentAnswer]);
        if (studentAnswers[studentAnswer] == modelAnswer[studentAnswer]) {
            grade++;
            // delete modelAnswer[studentAnswer]
        }
    });
 return grade
}


router.get("/gradeExamAnswers", (req, res) => {
    Exam.findOne({key:req.body.key}).select('questions')
    .exec(async (err, exam) => {
        const answers=await getModelAnswers(exam.questions);
        const studentAnswer ={"who is the richest person in Egypt?":"amr","which is the best Letter?":"A"};
        const studentGrade=await checkAnswers(studentAnswer,answers);
        res.json(studentGrade);
      });
})





module.exports = router;