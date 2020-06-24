const { Router } = require('express');
const TeacherController = require('../controllers/TeacherController.js');

const router = new Router();

router.post('/login', (req, res) => {
  TeacherController.login(req, res);
});

router.post('/', (req, res) => {
  TeacherController.register(req, res);
});
router.post('/sendKey', TeacherController.authenticate, (req, res) => {
  TeacherController.sendInvitation(req, res);
});

router.get('/logout', (req, res) => {
  TeacherController.logout(req, res);
});

router.get('/home', TeacherController.authenticate, (req, res) =>
  res.send('Hello World!')
);

router.get('/getExamStatus/:id', TeacherController.authenticate, (req, res) => {
  TeacherController.getExamStatus(req, res);
});

module.exports = router;
