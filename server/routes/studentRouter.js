const { Router } = require('express');
const Exam = require('../models/ExamModel');
const Student = require('../models/StudentModel');
const { getExamByCode,studentStartExam } = require('../controllers/StudentController');


const router = new Router();


// router.get("/", (req, res) => {
//    res.json("jjjj");
// })

router.post("/enroll",getExamByCode )


router.patch("/startExam", studentStartExam)





module.exports = router;