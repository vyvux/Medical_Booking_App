import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import { validateToken } from "../middlewares/AuthMiddleware";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  // router.get("/about", homeController.getAboutPage);

  router.post("/api/login", userController.handleLogin);

  router.get("/api/get-all-code", userController.getAllCodes);

  router.get("/api/get-all-patients", validateToken, userController.getAllPatients);

  router.post("/api/create-patient", validateToken, userController.createPatient);

  router.put("/api/edit-patient", validateToken, userController.editPatient);

  return app.use("/", router);
};

module.exports = initWebRoutes;
