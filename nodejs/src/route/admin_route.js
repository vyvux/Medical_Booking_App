import express from "express";
import adminController from "../controllers/adminController";

let router = express.Router();

let initWebRoutesAdmin = (app) => {
  /** Manage User */
  router.post("/api/create-system-user", adminController.createNewUserByAdmin);
  router.get("/api/get-all-users", adminController.handleGetAllUsers);
  router.put("/api/edit-system-user", adminController.editSystemUser);
  router.delete("/api/delete-system-user", adminController.deleteSystemUser);

  /** Manage Branch */
  router.post("/api/create-branch", adminController.createNewBranch);
  router.get("/api/get-all-branches", adminController.handleGetAllBranches);
  router.put("/api/edit-branch", adminController.editBranch);
  router.delete("/api/delete-branch", adminController.deleteBranch);

  return app.use("/", router);
};

module.exports = initWebRoutesAdmin;