const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendMail = async ({ to, subject, html }) => {
  const msg = {
    from: process.env.NODEMAILER_USER,
    to,
    subject,
    html,
  };

  return transporter.sendMail(msg);
};

module.exports = sendMail;
