import patientService from "../services/patientService";

let createNewUserNewPatient = async (req, res) => {
  console.log(req.body);
  let message = await patientService.registerNewUserWithNewPatient(req.body);
  console.log(message);
  return res.send("test create user and patient");
};

// unfinished in return
let createNewUserExistingPatient = async (req, res) => {
  console.log(req.body);
  let message = await patientService.registerNewUserWithExistingPatient(req.body);
  console.log(message);
  return res.send("test create user with existing patient");
};

module.exports = {
  createNewUserExistingPatient: createNewUserExistingPatient,
  createNewUserNewPatient: createNewUserNewPatient,
};
