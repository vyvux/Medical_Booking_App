import { sendEmailNodemailer } from "../services/emailService";

let sendMailRegistration = async (req, res) => {
  let email = req.body.email;
  if (!email) {
    return res.status(200).json({ errcode: 1, errMessage: "No email specified!" });
  }
  let message = await sendEmailNodemailer(email, 1);
  return res.status(200).json(message);
};

let sendMailBooking = async (req, res) => {
  let email = req.body.email;
  if (!email) {
    return res.status(200).json({ errcode: 1, errMessage: "No email specified!" });
  }
  let message = await sendEmailNodemailer(email, 2);
  return res.status(200).json(message);
};

module.exports = { sendMailRegistration, sendMailBooking };
