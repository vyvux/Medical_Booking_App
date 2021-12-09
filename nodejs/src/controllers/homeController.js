import db from "../models/index";

let getHomePage = (req, res) => {
  return res.render("homepage.ejs");
};
let getAboutPage = (req, res) => {
  return res.render("./test/about.ejs");
};

// export an object having multiple functions
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
};
