import express from "express";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebroutesDoctor = (app) => {
  router.post("/api/bulk-create-doctor-schedule", doctorController.bulkCreateSchedule);
  router.get("/api/get-doctor-schedule", doctorController.getDoctorSchedule);

  return app.use("/", router);
};

module.exports = initWebroutesDoctor;
