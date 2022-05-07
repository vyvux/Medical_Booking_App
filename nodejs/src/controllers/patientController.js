import patientService from "../services/patientService";

let createNewUserNewPatient = async (req, res) => {
  console.log(req.body);
  let message = await patientService.registerNewUserWithNewPatient(req.body);
  return res.status(200).json(message);
};

// unfinished in return
let createNewUserExistingPatient = async (req, res) => {
  console.log(req.body);
  let message = await patientService.registerNewUserWithExistingPatient(req.body);
  return res.status(200).json(message);
};

module.exports = {
  createNewUserExistingPatient: createNewUserExistingPatient,
  createNewUserNewPatient: createNewUserNewPatient,
};
