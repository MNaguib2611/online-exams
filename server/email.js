const nodemailer = require('nodemailer');


function sendMail(email,grade) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'online.exams.platform.iti@gmail.com',
          pass: 'ITIintake40'
        }
      });
      
      const mailOptions = {
        from: 'Online Exams',
        to: email,
        subject: 'Online Exam',
        html: `<h1>Your grade is </h1><p>${grade}</p>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


module.exports=sendMail;