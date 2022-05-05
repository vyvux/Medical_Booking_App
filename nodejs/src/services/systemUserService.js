import bcrypt from "bcryptjs";
import e from "express";
import db, { sequelize } from "../models/index";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        // User exist
        let user = await db.User.findOne({
          attributes: ["id", "email", "roleId", "firstName", "lastName", "password"],
          where: { email: email },
          raw: true, // return only object
        });

        if (user) {
          // compare password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            delete user.password; // delete password key from object
            userData.user = user;
          } else {
            (userData.errCode = 3), (userData.errMessage = "Wrong password");
          }
        } else {
          // cannot find user
          (userData.errCode = 2), (userData.errMessage = "User not found");
        }
        resolve(userData);
      } else {
        // return error
        userData.errCode = 1;
        userData.errMessage = `Your's Email doesn't exist in our system. Please try other email!`;
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// function to hash user password in registration process
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

// function to check if the email has been registered before
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// function create new user in DB
let createNewUser = (data, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newUser = await db.User.create({
        email: data.email,
        password: password,
        image: data.image,
        roleId: data.roleId,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      resolve(newUser);
    } catch (e) {
      reject(e);
    }
  });
};

// function create new patient profile in DB
let createNewPatient = (data, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newPatient = await db.Patient.create({
        dob: data.dob, // TODO format date
        phoneNumber: data.phoneNumber,
        address: data.address,
        allergy: data.allergy,
        firstName: data.firstName,
        lastName: data.lastName,
        userId: userId === null ? null : userId,
        gender: data.gender === "1" ? true : false,
      });

      resolve(newPatient);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllPatients = (patientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let patients = "";
      if (patientId === "ALL") {
        patients = await db.Patient.findAll({
          attributes: {
            include: ["id", "userId", "phoneNumber", "address", "allergy", "firstName", "lastName", [sequelize.fn("DATE_FORMAT", sequelize.col("dob"), "%Y-%m-%d"), "dob"], "createdAt", "updatedAt"],
          },
        });
      }

      if (patientId && patientId !== "ALL") {
        patients = await db.Patient.findOne({
          where: { id: patientId },
          attributes: {
            include: ["id", "userId", "phoneNumber", "address", "allergy", "firstName", "lastName", [sequelize.fn("DATE_FORMAT", sequelize.col("dob"), "%Y-%m-%d"), "dob"], "createdAt", "updatedAt"],
          },
        });
      }
      resolve(patients);
    } catch (e) {
      reject(e);
    }
  });
};

let editPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }

      // check for valid userID if associated
      if (data.userId) {
        let user = await db.User.findOne({
          where: { id: data.userId },
          raw: false,
        });
        if (!user || user.roleId !== "R3") {
          resolve({
            errCode: 3,
            errMessage: "Registered user not found!",
          });
        }
      }

      let patient = await db.Patient.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (patient) {
        patient.firstName = data.firstName;
        patient.lastName = data.lastName;
        patient.userId = data.userId;
        patient.gender = data.gender;
        patient.dob = data.dob;
        patient.phoneNumber = data.phoneNumber;
        patient.address = data.address;
        patient.allergy = data.allergy;

        await patient.save();
        resolve({
          errCode: 0,
          message: "Update patient information successfully!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Patient not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkValidPatientId = (patientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let patient = await db.Patient.findOne({
        where: { id: patientId },
      });
      if (patient) {
        // patient exists
        if (patient.userId === null) {
          // no associated system user for this patient
          resolve(true);
        } else {
          // patient profile has been linked with another system user
          resolve(false);
        }
      } else {
        // patient doesnt exist
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allCodes = await db.Allcode.findAll({
        attributes: ["key", "value"],
      });
      resolve(allCodes);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,

  checkUserEmail: checkUserEmail,
  hashUserPassword: hashUserPassword,
  checkValidPatientId: checkValidPatientId,
  createNewUser: createNewUser,
  createNewPatient: createNewPatient,
  getAllCodes: getAllCodes,
  getAllPatients: getAllPatients,
  editPatient: editPatient,
};
