const nodemailer = require('nodemailer');
const fs = require('fs').promises;

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'furdu33@hotmail.com',
        pass: 'Furdu123'
    }
});

const sendEmail = async (receiverEmail, subject, fileName) => {
    transporter.sendMail({
        from: 'furdu33@hotmail.com',
        to: receiverEmail,
        subject: subject,
        text: 'hello',
        html: await fs.readFile('./emails/' + fileName, 'utf8')
    }, function(err,info){
        if(err){
            console.log('Unable to send the mail :'+ err.message);
        }
        else{
            console.log('Message response : '+ info.response);
        }
    });
}

module.exports = sendEmail;
