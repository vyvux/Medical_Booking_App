import express from "express";
import doctorController from "../controllers/doctorController";
import { validateToken } from "../middlewares/AuthMiddleware";

let router = express.Router();

let initWebroutesDoctor = (app) => {
  router.post("/api/bulk-create-doctor-schedule", validateToken, doctorController.bulkCreateSchedule);
  router.post("/api/get-doctor-schedule", validateToken, doctorController.getDoctorSchedule);

  return app.use("/", router);
};

module.exports = initWebroutesDoctor;
