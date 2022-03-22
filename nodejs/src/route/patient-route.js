import express from "express";
import patientControler from "../controllers/patientController";

let router = express.Router();

let initWebroutesPatient = (app) => {
  router.post("/api/create-user-patient", patientControler.createNewUserNewPatient);

  router.post("/api/create-user-existing-patient", patientControler.createNewUserExistingPatient);

  return app.use("/", router);
};

module.exports = initWebroutesPatient;
