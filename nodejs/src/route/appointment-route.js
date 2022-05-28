import express from "express";
import appointmentController from "../controllers/appointmentController";
import { validateToken } from "../middlewares/AuthMiddleware";

let router = express.Router();

let initWebroutesAppointment = (app) => {
  router.post("/api/create-appointment", validateToken, appointmentController.createAppointment);

  router.post("/api/get-all-appointments", validateToken, appointmentController.getAllAppointments);
  router.post("/api/delete-appointment", validateToken, appointmentController.deleteAppointment);

  return app.use("/", router);
};

module.exports = initWebroutesAppointment;
