import axios from "../axios";

/** Register new patient user */
const registerNewPatient = (data) => {
  return axios.post("api/create-user-patient", data);
};
const registerExistingPatient = (data) => {
  return axios.post("api/create-user-existing-patient", data);
};

export { registerNewPatient, registerExistingPatient };
