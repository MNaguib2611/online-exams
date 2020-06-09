const { Router } = require('express');
const Exam = require('../models/ExamModel');
const Student = require('../models/StudentModel');

const router = new Router();


// router.get("/", (req, res) => {
//    res.json("jjjj");
// })

router.post("/getExamByCode", (req, res) => {
    Exam.findOne({key:req.body.key}).exec((err, exam) => {
        if (!exam) {
            res.status(404).json({"msg":"No exam with that code was found"}); 
        }else{
            if (exam.startDate <= Date.now() && exam.endDate > Date.now()) {
                const student = new Student({
                    name:req.body.name,
                    email:req.body.email,
                    exam:exam._id,
                    score:0,
                    startedAt:null
                });
                student.save()
                    .then(() => res.status(200).json({exam}))
                    .catch((err) => res.status(400).json({"msg":"you already enrolled for this exam" }))
            } else if (exam.startDate > Date.now()) {
                res.status(401).json({"msg":"Exam hasn't started yet"}); 
            }else{
                res.status(401).json({"msg":"Exam has already finished"}); 
            } 
        }
      });
})


router.patch("/startExam", (req, res) => {
    Student.findOne({exam:req.body.exam,email:req.body.email}).exec((err, student) => {
        if (student && student.startedAt===null) {
            student.startedAt=Date.now(); 
            student.save()
            const startedExam = new Date().toISOString().
            replace(/T/, ' ').   
            replace(/\..+/, '')   
            res.status(201).json({"msg":`exam started at ${startedExam}`}); 
        } else {
            res.status(404).json({"msg":"something went wrong"}); 
        }
    })
})





module.exports = router;