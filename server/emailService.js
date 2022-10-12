const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const cheerio = require("cheerio");

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'group33.webdev@hotmail.com',
        pass: 'webdevgroup33'
    }
});

const sendEmail = async (receiverEmail, fileName) => {
    transporter.sendMail({
        from: 'group33.webdev@hotmail.com',
        to: receiverEmail,
        subject: 'Welcome',
        text: 'hello',
        html: await readFile('/Users/ivanvidackovic/group-33-web/server/emails/' + fileName, 'utf8')
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