import nodemailer from "nodemailer";
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gigialexias@gmail.com",
    pass: process.env.NODEMAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

let registrationConfirm = (recipient) => {
  return {
    from: '"MedCare Solution" <gigialexias@gmail.com>',
    to: recipient,
    subject: "Welcome to MedCare! Confirmation of your account",
    html: '<h3>Thanks for signing up with Medcare!</h3><p>You have successfully create an account with us. Please login to the system to book your next medical appointment.</p><p><a href="https://react-medcare-master-project.herokuapp.com/login">Click here to login.</a></p>',
  };
};

let appointmentConfirm = (recipient) => {
  return {
    from: '"MedCare Solution" <gigialexias@gmail.com>',
    to: recipient,
    subject: "Welcome to MedCare! Confirmation of your medical booking",
    html: "<h3>Thanks for booking medical appointment with Medcare!</h3><p>You have successfully create an appointment. Now you can login to the system to view your medical appointment.</p>",
  };
};

let sendEmailNodemailer = async (recipient, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let option = {};
      if (type === 1) {
        option = registrationConfirm(recipient);
      } else if (type === 2) {
        option = appointmentConfirm(recipient);
      } else {
        resolve({
          errCode: 2,
          errMessage: "No email type specified!",
        });
      }
      await transporter.sendMail(option, function (err, info) {
        if (err) {
          console.log(err);
          resolve({
            errCode: 1,
            errMessage: "Sending error",
          });
        }
        console.log("Send res:", info);
        resolve({
          errCode: 0,
          message: "Send mail successfully",
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { sendEmailNodemailer };
