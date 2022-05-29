import express from "express";
import emailController from "../controllers/emailController";

let router = express.Router();

let initWebRoutesEmail = (app) => {
  //   router.get("/", homeController.getHomePage);

  //   // router.get("/about", homeController.getAboutPage);

  //   router.post("/api/login", userController.handleLogin);

  //   router.get("/api/get-all-code", userController.getAllCodes);

  //   router.get("/api/get-all-patients", validateToken, userController.getAllPatients);

  //   router.post("/api/create-patient", validateToken, userController.createPatient);

  //   router.put("/api/edit-patient", validateToken, userController.editPatient);

  router.post("/api/send-email-registration", emailController.sendMailRegistration);
  router.post("/api/send-email-booking", emailController.sendMailBooking);

  return app.use("/", router);
};

module.exports = initWebRoutesEmail;
