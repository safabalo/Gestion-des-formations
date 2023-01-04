const nodemailer = require("nodemailer");
require("dotenv").config();

function main(user, msg) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let info = {
    from: `Formation👩🏻‍🏫 <${process.env.EMAIL}>`,
    to: user.email,
    subject: " Account created",
    html: msg,
  };
  transporter.sendMail(info);

  console.log("Message sent");
}

module.exports = { main };
