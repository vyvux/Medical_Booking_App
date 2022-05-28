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
    accessToken: userData.accessToken,
  });
};

let getAllCodes = async (req, res) => {
  let type = req.query.type;
  if (!type) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      allCodes: [],
    });
  }
  let response = await systemUserService.getAllCodes(req.query.type);
  return res.status(200).json({
    errCode: 0,
    allCodes: response.allCodes ? response.allCodes : {},
  });
};

let getAllPatients = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      branches: [],
    });
  }
  let patients = await systemUserService.getAllPatients(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    patients,
  });
};

let createPatient = async (req, res) => {
  let message = await systemUserService.createNewPatient(req.body);
  return res.status(200).json(message);
};

let editPatient = async (req, res) => {
  let data = req.body;
  let response = await systemUserService.editPatient(data);
  return res.status(200).json(response);
};

module.exports = {
  handleLogin: handleLogin,
  getAllCodes: getAllCodes,
  getAllPatients: getAllPatients,
  createPatient: createPatient,
  editPatient: editPatient,
};
