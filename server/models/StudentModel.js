const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 20,
    },
    email: {
        type: String, 
        match: [/^([\w\.]*)(@)([\w\.]*)?(.com)$/, 'Please fill a valid email address'],
        // unique: true,
        required: true,
    },
    // exams: [{exam: {type: 'ObjectId', ref: 'Exam'}, score: Number}],
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Exam'
    },
    score: Number,
    percentage:Number,
    startedAt: Date,
    submittedAt: Date,
    mustSubmitBefore: Date

}, { timestamps: true });

StudentSchema.index({ email: 1, exam: 1 }, { unique: true });
const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;