import express from "express";
import appointmentController from "../controllers/appointmentController";

let router = express.Router();

let initWebroutesAppointment = (app) => {
  router.post("/api/create-appointment", appointmentController.createAppointment);

  router.post("/api/get-all-appointments", appointmentController.getAllAppointments);
  router.post("/api/delete-appointment", appointmentController.deleteAppointment);

  return app.use("/", router);
};

module.exports = initWebroutesAppointment;
