import db, { sequelize } from "../models/index";
require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

// function creating new user and new patient profile
let registerNewUserWithNewPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExistingEmail = await checkUserEmail(data.email);
      if (isExistingEmail === false) {
        // Email ready to use
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        // create new user
        let newUser = await createNewUser(data, hashPasswordFromBcrypt);

        // create new patient
        let newPatient = await createNewPatient(data, newUser.id);

        resolve({
          errCode: 0,
          message: "new user and profile were created",
          user: newUser,
          patient: newPatient,
        });
      } else {
        // Email was registered
        resolve({
          errCode: 1,
          errMessage: "Email has already been registered.",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// function creating new user and associate with existing patient profile
let registerNewUserWithExistingPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      }
      // check unique email
      let isExistingEmail = await checkUserEmail(data.email);
      // Email was registered
      if (isExistingEmail) {
        resolve({
          errCode: 2,
          errMessage: "Email has already been registered.",
        });
      }

      // Email hasn't been registered

      // check params patient id + patient name
      if (!data.patientId && !data.patientName) {
        resolve({
          errCode: 3,
          errMessage: "Missing patient information.",
        });
      }

      let patientCheck = await checkValidPatientId(data.patientId);
      // patient profile not found
      if (!patientCheck.valid) {
        resolve({
          errCode: 4,
          errMessage: "Patient ID was incorrect or was registered with another user.",
        });
      }

      let foundPatient = patientCheck.patient;
      console.log("check length: ", foundPatient.length);
      // patientID not associated with any user
      if (foundPatient && foundPatient.firstName === data.patientName) {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        // create new user
        let newUser = await createNewUser(data, hashPasswordFromBcrypt);

        // assign userId to patient profile
        foundPatient.userId = newUser.id;
        await foundPatient.save();

        resolve({
          errCode: 0,
          errMessage: "Register new user with existing patient.",
          patient: foundPatient,
          user: newUser,
        });
      } else {
        resolve({
          errCode: 5,
          errMessage: "Incorrect patient information.",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let bulkCreateDoctorSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      }

      let schedule = data.arrSchedule;
      if (schedule && schedule.length > 0) {
        schedule.map((item) => {
          item.maxNumber = MAX_NUMBER_SCHEDULE;
          return item;
        });

        await db.Availability.bulkCreate(schedule);
        resolve({
          errCode: 0,
          message: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  bulkCreateDoctorSchedule: bulkCreateDoctorSchedule,
};
