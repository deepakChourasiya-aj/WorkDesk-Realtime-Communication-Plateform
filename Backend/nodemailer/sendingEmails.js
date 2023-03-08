const nodemailer = require("nodemailer");
require("dotenv").config()

  


async function sendEmail(email,credentials,name) {
   //   console.log(email);
   //   transpoter to send/transport email

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'fsociety430@gmail.com',
      pass: process.env.GoogleKey
  }
  });

  transporter.sendMail({
    to: `${email}`,
    from: 'chikkuuu@gmail.com',
    subject: 'WorkDesk Login credentials',
    html: ` Hey, ${name} \n Thanks you for signUp \n \n Here is your email ${email} and Password : ${credentials}`
  })
  .then(()=>console.log('mail sent successfully'))
  .catch((err)=>console.log(err.message))

}

module.exports = {sendEmail,}