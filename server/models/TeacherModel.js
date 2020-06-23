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
      required: false,
      minlength: 8,
    },
    facebookID: { type: Number },
    googleID: {type: Number}
  },
  { timestamps: true }
);

const TeacherModel = mongoose.model('Teacher', TeacherSchema);
module.exports = TeacherModel;
