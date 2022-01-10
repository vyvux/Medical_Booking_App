import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/about", homeController.getAboutPage);

  router.post("/api/create-system-user", userController.createNewUserByAdmin);

  router.post(
    "/api/create-user-patient",
    userController.createNewUserNewPatient
  );

  router.post(
    "/api/create-user-existing-patient",
    userController.createNewUserExistingPatient
  );

  router.post("/api/login", userController.handleLogin);

  return app.use("/", router);
};

module.exports = initWebRoutes;
