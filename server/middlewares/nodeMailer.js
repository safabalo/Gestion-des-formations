const nodemailer = require("nodemailer");
require('dotenv').config();

function main(method, user) {
  if (method == "addEmployer") {
    subject = " Account created";
    html = `<div>
                <h3>Hello ${user.username}<h3>
                <div>
                  <div>Congratulation you just joined our deliver</div> 
                  <div>List you can find your password bellow</div>
                  <div>Your email: <strong>${user.email}</strong></div>
                  <div>Passord:<strong>${user.password}</strong></div>
                  <div>Click the button bellow to access to login page</div>
                  <a href="#" style="background-color: #f59e0b; border: none;color: white;padding: 15px 32px; text-align: center; text-decoration: none;display: inline-block;">
                    Log here
                  </a>
                </div>
                `;
  }
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let info = {
    from: `"Formation👩🏻‍🏫" <${process.env.EMAIL}>`,
    to: user.email,
    subject: subject,
    html: html,
  };
  transporter.sendMail(info);

  console.log("Message sent");
}

module.exports = { main };
