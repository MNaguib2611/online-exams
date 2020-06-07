const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

const readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};



function sendMail(email,template,info) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.APP_MAIL ,
      pass: process.env.APP_MAIL_pass
    }
  });

  const templateHTML=template

  readHTMLFile(__dirname + `/emailTemplates/${templateHTML}.html`, function(err, html) {
      const template = handlebars.compile(html);
      const htmlToSend = template(info);
      const mailOptions = {
          from: 'Online Exams',
          to: email,
          subject: 'Online Exam',
          html: htmlToSend
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
  });
}





module.exports=sendMail;