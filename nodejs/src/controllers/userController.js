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

module.exports = {
  handleLogin: handleLogin,
};
