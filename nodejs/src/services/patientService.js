import db, { sequelize } from "../models/index";
import { checkUserEmail, hashUserPassword, createNewUser, createNewPatient, checkValidPatientId } from "./systemUserService";

// function creating new user and new patient profile
let registerNewUserWithNewPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExistingEmail = await checkUserEmail(data.email);
      if (isExistingEmail === false) {
        // Email hasn't been registered
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        // create new user
        let newUser = await createNewUser(data, hashPasswordFromBcrypt);

        // create new patient

        let newPatient = await createNewPatient(data, newUser.id);

        resolve("new user and profile were created");
      } else {
        // Email was registered
        resolve("Email has already been registered");
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
      // check unique email
      let isExistingEmail = await checkUserEmail(data.email);

      if (!isExistingEmail) {
        // Email hasn't been registered
        if (data.patientId) {
          let isValidPatientId = await checkValidPatientId(data.patientId);
          if (isValidPatientId) {
            // patientID not associated with any user

            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            // create new user
            let newUser = await createNewUser(data, hashPasswordFromBcrypt);
            //assign userId to patient profile
            let patient = await db.Patient.findOne({
              where: { id: data.patientId },
            });
            if (patient) {
              patient.userId = newUser.id;
              await patient.save();

              resolve("registered new user with patient profile");
            } else {
              resolve("patient profile not found");
            }
          } else {
            // patientID was associated with another user
            resolve("Patient ID was incorrect or was registered by another user.");
          }
        } else {
          resolve("not receive patientID");
        }
      } else {
        // Email was registered
        resolve("Email has already been registered");
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  registerNewUserWithExistingPatient: registerNewUserWithExistingPatient,
  registerNewUserWithNewPatient: registerNewUserWithNewPatient,
};
