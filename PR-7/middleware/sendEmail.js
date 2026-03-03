const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user:"drashtinasit780@gmail.com",
        pass: "nttvdossnuxgoyoe"
    }
});


exports.sendEmail = async (message) => {
    let res = await transport.sendMail(message);
    console.log("Mail Response: ",res);
    return res;
}