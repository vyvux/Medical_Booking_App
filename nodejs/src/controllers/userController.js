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

/** ADMIN functions*/
let createNewUserByAdmin = async (req, res) => {
  let message = await systemUserService.createNewUserByAdmin(req.body);
  return res.status(200).json(message);
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //ALL ,or id

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

let editSystemUser = async (req, res) => {
  let data = req.body;
  let message = await systemUserService.editSystemUserByAdmin(data);
  return res.status(200).json(message);
};

let deleteSystemUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await systemUserService.deleteUserByAdmin(req.body.id);
  return res.status(200).json(message);
};

/** PATIENT functions*/
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

module.exports = {
  handleLogin: handleLogin,
  createNewUserByAdmin: createNewUserByAdmin,
  createNewUserNewPatient: createNewUserNewPatient,
  createNewUserExistingPatient: createNewUserExistingPatient,
  handleGetAllUsers: handleGetAllUsers,
  editSystemUser: editSystemUser,
  deleteSystemUser: deleteSystemUser,
};
