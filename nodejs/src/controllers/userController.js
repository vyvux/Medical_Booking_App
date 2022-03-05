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

// unfinshed in return
let createNewUserByAdmin = async (req, res) => {
  console.log(req.body);
  let message = await systemUserService.createNewUserByAdmin(req.body);
  console.log(message);
  return res.send("create new user by admin");
};

// unfinished in return
let createNewUserNewPatient = async (req, res) => {
  console.log(req.body);
  let message = await systemUserService.registerNewUserWithNewPatient(req.body);
  console.log(message);
  return res.send("test create user and patient");
};

// unfinished in return
let createNewUserExistingPatient = async (req, res) => {
  console.log(req.body);
  let message = await systemUserService.registerNewUserWithExistingPatient(
    req.body
  );
  console.log(message);
  return res.send("test create user with existing patient");
};

let handleGetAllUsers = async (req, res) => {
  let id = req.body.id; //ALL ,or id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }

  let users = await systemUserService.getAllUsers(id);
  console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

module.exports = {
  handleLogin: handleLogin,
  createNewUserByAdmin: createNewUserByAdmin,
  createNewUserNewPatient: createNewUserNewPatient,
  createNewUserExistingPatient: createNewUserExistingPatient,
  handleGetAllUsers: handleGetAllUsers,
};
