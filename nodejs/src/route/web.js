import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/about", homeController.getAboutPage);

  router.post("/api/login", userController.handleLogin);

  router.get("/api/get-all-code", userController.getAllCodes);

  router.get("/api/get-all-patients", userController.getAllPatients);

  router.post("/api/create-patient", userController.createPatient);

  return app.use("/", router);
};

module.exports = initWebRoutes;
