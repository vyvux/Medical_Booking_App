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
          attributes: ["email", "roleId", "password"],
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

// function to create new system user, performed by Admin
let createNewUserByAdmin = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check unique email
      let isExistingEmail = await checkUserEmail(data.email);
      if (isExistingEmail === false) {
        // Email hasn't been registered
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        let newUser = await createNewUser(data, hashPasswordFromBcrypt);

        resolve({
          errCode: 0,
          message: "OK. New user created",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Email has already been registered",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            // exclude: ["password"],
            include: [
              "id",
              "email",
              "firstName",
              "lastName",
              "roleId",
              [
                sequelize.fn(
                  "DATE_FORMAT",
                  sequelize.col("createdAt"),
                  "%d-%m-%Y %H:%i:%s"
                ),
                "createdAt",
              ],
              "updatedAt",
            ],
          },
        });
      }

      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            // exclude: ["password"],
            include: [
              "id",
              "email",
              "firstName",
              "lastName",
              "roleId",
              [
                sequelize.fn(
                  "DATE_FORMAT",
                  sequelize.col("createdAt"),
                  "%d-%m-%Y %H:%i:%s"
                ),
                "createdAt",
              ],
              "updatedAt",
            ],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserByAdmin = async (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });

    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "User not found",
      });
    }

    await db.User.destroy({
      where: { id: userId },
    });

    resolve({
      errCode: 0,
      message: "User is deleted",
    });
  });
};

let editSystemUserByAdmin = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }

      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.roleId = data.roleId;

        await user.save();
        resolve({
          errCode: 0,
          message: "Update user information successfully!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

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
            resolve(
              "Patient ID was incorrect or was registered by another user."
            );
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

module.exports = {
  handleUserLogin: handleUserLogin,

  createNewUserByAdmin: createNewUserByAdmin,
  getAllUsers: getAllUsers,
  deleteUserByAdmin: deleteUserByAdmin,
  editSystemUserByAdmin: editSystemUserByAdmin,

  registerNewUserWithExistingPatient: registerNewUserWithExistingPatient,
  registerNewUserWithNewPatient: registerNewUserWithNewPatient,
};
