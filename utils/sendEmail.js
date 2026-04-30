const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error('Email transporter failed:', error.message);
  } else {
    console.log('Email transporter ready:', process.env.EMAIL_USER);
  }
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: '"SafarWise" <' + process.env.EMAIL_USER + '>',
      to,
      subject,
      html,
    });
    console.log('Email sent to:', to);
  } catch (error) {
    console.error('Email send failed:', error.message);
    throw error;
  }
};

module.exports = sendEmail;