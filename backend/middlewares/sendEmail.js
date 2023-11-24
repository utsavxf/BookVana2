const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3fa7bb69cc1c36",
      pass: "7eeb6974b8499c"
    }
  });


  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};