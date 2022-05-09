import express from "express";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebroutesDoctor = (app) => {
  router.post("/api/bulk-create-doctor-schedule", doctorController.bulkCreateSchedule);

  return app.use("/", router);
};

module.exports = initWebroutesDoctor;
