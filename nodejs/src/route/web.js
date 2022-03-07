import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/about", homeController.getAboutPage);

  /** Patient */
  router.post(
    "/api/create-user-patient",
    userController.createNewUserNewPatient
  );

  router.post(
    "/api/create-user-existing-patient",
    userController.createNewUserExistingPatient
  );

  /** Admin */
  router.post("/api/create-system-user", userController.createNewUserByAdmin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.put("/api/edit-system-user", userController.editSystemUser);
  router.delete("/api/delete-system-user", userController.deleteSystemUser);

  /** Doctor */
  /** Medical staff */

  router.post("/api/login", userController.handleLogin);

  return app.use("/", router);
};

module.exports = initWebRoutes;
