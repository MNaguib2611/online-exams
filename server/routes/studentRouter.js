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
        }
      });
})







module.exports = router;