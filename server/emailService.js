const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = (receiverEmail) => {
    transporter.sendMail({
        from: process.env.EMAIL,
        to: receiverEmail,
        subject: 'Welcome',
        text: 'Thanks for using our website'
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