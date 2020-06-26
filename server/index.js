const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const sendMail = require('./email'); //use this function whenwver you want to send an email sendMail(email,data to be passed)

const { teacherRouter, examRouter, studentRouter } = require('./routes');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/exams', examRouter);
app.use('/teacher', teacherRouter);

// middleware that logs requests method and the url requested.
app.use((req, res, next) => {
  console.log(`\n\n${new Date().toISOString()}`);
  console.log(`new request, its method: ${req.method}`);
  console.log(`the url requested: ${req.url}\n`);
  next();
});

// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.connect(
  `mongodb://${process.env.DEVELOPMENT_SERVER}:${process.env.DATA_BASE_PORT}/OnlineExamsPlatform`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        '\x1b[32m%s\x1b[0m',
        `connected to mongoose on port ${process.env.DATA_BASE_PORT}`
      );
    }
  }
);

// call the function at the route that is required
// first argument is the recipient email
// second argument is the template name (found in ./emailTemplates)
// third argument is the object containing all info to be sent

//    sendMail('m.naguib2611@gmail.com','teacher1',{teacherName:"Mr.Naguib"});

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/exams', examRouter);
app.use('/students', studentRouter);

app.listen(process.env.SERVER_PORT, () =>
  console.log(
    '\x1b[32m%s\x1b[0m',
    `Example app listening at http://localhost:${process.env.SERVER_PORT}`
  )
);
