const nodemailer = require("nodemailer");
require('dotenv').config();

async function sendEmail(to, subject='Testing', text='Hello this is a testing mail!') {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_SECRET
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    return "success";
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = { sendEmail };