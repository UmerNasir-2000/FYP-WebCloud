const nodemailer = require("nodemailer");

const sendEmail = async (receiver) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  let mailOptions = {
    from: `"Web Cloud" <${process.env.SENDER_EMAIL}>`,
    to: `${receiver}`,
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
