import express from "express";
import adminController from "../controllers/adminController";
import { validateToken } from "../middlewares/AuthMiddleware";

let router = express.Router();

let initWebRoutesAdmin = (app) => {
  /** Manage User */
  router.post("/api/create-system-user", validateToken, adminController.createNewUserByAdmin);
  router.get("/api/get-all-users", validateToken, adminController.handleGetAllUsers);
  router.put("/api/edit-system-user", validateToken, adminController.editSystemUser);
  router.delete("/api/delete-system-user", validateToken, adminController.deleteSystemUser);

  /** Manage Branch */
  router.post("/api/create-branch", validateToken, adminController.createNewBranch);
  router.get("/api/get-all-branches", adminController.handleGetAllBranches);
  router.put("/api/edit-branch", validateToken, adminController.editBranch);
  router.delete("/api/delete-branch", validateToken, adminController.deleteBranch);

  /** Manage Service */
  router.post("/api/create-service", validateToken, adminController.createNewService);
  router.get("/api/get-all-services", adminController.handleGetAllServices);
  router.put("/api/edit-service", validateToken, adminController.editService);
  router.delete("/api/delete-service", validateToken, adminController.deleteService);

  /** Manage Doctor */
  router.post("/api/create-doctor", validateToken, adminController.createNewDoctor);
  router.get("/api/get-all-doctors", adminController.getAllDoctors);
  router.put("/api/edit-doctor", validateToken, adminController.editDoctorInfo);
  router.delete("/api/delete-doctor", validateToken, adminController.deleteDoctor);

  /** Manage Log */
  router.post("/api/add-log", adminController.addNewLog);
  router.get("/api/get-all-logs", validateToken, adminController.handleGetAllLogs);

  return app.use("/", router);
};

module.exports = initWebRoutesAdmin;
