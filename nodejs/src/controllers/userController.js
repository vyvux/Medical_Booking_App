import systemUserService from "../services/systemUserService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // validate inputs
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  // compare password -> return user info
  let userData = await systemUserService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

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
  handleLogin: handleLogin,
  createNewUserByAdmin: createNewUserByAdmin,
  createNewUserNewPatient: createNewUserNewPatient,
  createNewUserExistingPatient: createNewUserExistingPatient,
};
