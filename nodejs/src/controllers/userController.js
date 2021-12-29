import systemUserService from "../services/systemUserService";

let createNewUserByAdmin = async (req, res) => {
  console.log(req.body);
  let message = await systemUserService.createNewUserByAdmin(req.body);
  console.log(message);
  return res.send("create new user by admin");
};

let createNewUserNewPatient = async (req, res) => {
  console.log(req.body);
  let message = await systemUserService.registerNewUserWithNewPatient(req.body);
  console.log(message);
  return res.send("test create user and patient");
};

let createNewUserExistingPatient = async (req, res) => {
  console.log(req.body);
  let message = await systemUserService.registerNewUserWithExistingPatient(
    req.body
  );
  console.log(message);
  return res.send("test create user with existing patient");
};

module.exports = {
  createNewUserByAdmin: createNewUserByAdmin,
  createNewUserNewPatient: createNewUserNewPatient,
  createNewUserExistingPatient: createNewUserExistingPatient,
};
