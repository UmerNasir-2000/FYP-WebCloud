const nodemailer = require("nodemailer");
const logger = require("../utils/logger");

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

  console.log(typeof receiver);

  const output = `
        <h3>Your Project Configuration</h3>
        <div style="display: flex; text-align: justify; color: aliceblue">
          <ul>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSNOZIbYKTA91P22s8e1LpfWprlbpz8vK1fg&usqp=CAU" width="50px" height="50px" style="border-radius: 50px;" alt="Email Avatar" />
          </ul>
       <ul style="list-style-type: circle;">
          <li style="color: black">Your User is : root</li>
          <li style="color: black">Your Database Password : ${receiver.db_password}</li>
          <li style="color: black">Your Project Name : ${receiver.project_name}</li>
          <li style="color: black">Your Web framework : ${receiver.web_framework}</li>
          <li style="color: black">Your Project Database Engine : ${receiver.database}</li>
          <li style="color: black">Your Project Database Name : ${receiver.db_name}</li>
       </ul>
      </div>
`;

  let mailOptions = {
    from: `"Web Cloud" <${process.env.SENDER_EMAIL}>`,
    to: `${receiver.email}`,
    subject: `Details of Project ${receiver.project_name}`,
    text: output,
    html: output,
  };

  let forgotPasswordOptions = {
    from: `"Web Cloud" <${process.env.SENDER_EMAIL}>`,
    to: `${receiver}`,
    subject: `Reset Password Email`,
    text: `Reset Password With Link http://localhost:5000/forgot-password.html,\n Use This Activation Code = 95xcBvzqOOlkcx@vc`,
    html: `Reset Password With Link <a href="http://localhost:5000/forgot-password.html">Forgot Password Link</a> ,\n Use This Activation Code = 95xcBvzqOOlkcx@vc`,
  };

  let info = await transporter.sendMail(
    typeof receiver === "object" ? mailOptions : forgotPasswordOptions
  );

  logger.info("Message sent: %s", info.messageId);
  logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
