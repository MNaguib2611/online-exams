const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      match: [
        /^([\w\.]*)(@)([\w\.]*)?(.com)$/,
        'Please fill a valid email address',
      ],
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

const TeacherModel = mongoose.model('Teacher', TeacherSchema);
module.exports = TeacherModel;
