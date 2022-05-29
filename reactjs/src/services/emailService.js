import axios from "../axios";

const sendRegistrationConfirm = (email) => {
  return axios.post("api/send-email-registration", { email: email });
};

const sendBookingConfirm = (email) => {
  return axios.post("api/send-email-booking", { email: email });
};

export { sendRegistrationConfirm, sendBookingConfirm };
