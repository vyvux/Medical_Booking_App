import e from "express";
import db, { sequelize } from "../models/index";
import { checkUserEmail, hashUserPassword, createNewUser } from "./systemUserService";

// Manage Users
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
          message: "Create new user successfully!",
          newUser: newUser,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Email has already been registered. Please use another email.",
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
            exclude: ["password"],
            include: ["id", "email", "firstName", "lastName", "roleId", [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), "createdAt"], "updatedAt"],
          },
        });
      }

      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            // exclude: ["password"],
            include: ["id", "email", "firstName", "lastName", "roleId", [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), "createdAt"], "updatedAt"],
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
        errCode: 1,
        errMessage: "User not found",
      });
    }

    // check if user is doctor role and is registered in doctor list
    let doctor = await db.Doctor.findOne({
      where: { userId: user.id },
    });

    if (doctor) {
      resolve({
        errCode: 2,
        errMessage: "This user has doctor role and has been registered as a doctor. Consider remove the user from doctor list before deleting user.",
      });
    } else {
      await db.User.destroy({
        where: { id: userId },
      });

      resolve({
        errCode: 0,
        message: "User is deleted",
      });
    }
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

// Manage Branches
let createNewBranch = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newBranch = await db.Branch.create({
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        description: data.description,
        image: data.image,
      });
      resolve({
        errCode: 0,
        message: "Create new branch successfully!",
        branch: newBranch,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllBranches = async (branchId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let branches = "";
      if (branchId === "ALL") {
        branches = await db.Branch.findAll({
          attributes: {
            include: ["id", "name", "address", "phoneNumber", "description", [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), "createdAt"], "updatedAt"],
          },
        });
      }

      if (branchId && branchId !== "ALL") {
        branches = await db.Branch.findOne({
          where: { id: branchId },
          attributes: {
            include: ["id", "name", "address", "phoneNumber", "description", [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), "createdAt"], "updatedAt"],
          },
        });
      }
      resolve(branches);
    } catch (e) {
      reject(e);
    }
  });
};

let editBranch = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }

      let branch = await db.Branch.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (branch) {
        branch.name = data.name;
        branch.address = data.address;
        branch.phoneNumber = data.phoneNumber;
        branch.description = data.description;

        await branch.save();
        resolve({
          errCode: 0,
          message: "Update branch information successfully!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Branch not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBranch = async (branchId) => {
  return new Promise(async (resolve, reject) => {
    let branch = await db.Branch.findOne({
      where: { id: branchId },
    });

    if (!branch) {
      resolve({
        errCode: 1,
        errMessage: "Branch not found",
      });
    }

    // check if there is still any doctor registered for this branch
    let doctor = await db.Doctor.findOne({
      where: { branchId: branch.id },
    });

    if (doctor) {
      resolve({
        errCode: 2,
        errMessage: "There is doctor registered with this branch. Consider remove all associated doctors before deleting this branch.",
      });
    } else {
      await db.Branch.destroy({
        where: { id: branchId },
      });

      resolve({
        errCode: 0,
        message: "Delete branch successfully!",
      });
    }
  });
};

// Manage Service
let createNewService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newService = await db.Service.create({
        name: data.name,
        description: data.description,
      });
      resolve({
        errCode: 0,
        message: "Create new service successfully!",
        service: newService,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllServices = async (serviceId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let services = "";
      if (serviceId === "ALL") {
        services = await db.Service.findAll({
          attributes: {
            include: ["id", "name", "description", [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), "createdAt"], "updatedAt"],
          },
        });
      }

      if (serviceId && serviceId !== "ALL") {
        services = await db.Service.findOne({
          where: { id: serviceId },
          attributes: {
            include: ["id", "name", "description", [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), "createdAt"], "updatedAt"],
          },
        });
      }
      resolve(services);
    } catch (e) {
      reject(e);
    }
  });
};

let editService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }

      let service = await db.Service.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (service) {
        service.name = data.name;
        service.description = data.description;

        await service.save();
        resolve({
          errCode: 0,
          message: "Update service information successfully!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Service not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteService = async (serviceId) => {
  return new Promise(async (resolve, reject) => {
    let service = await db.Service.findOne({
      where: { id: serviceId },
    });

    if (!service) {
      resolve({
        errCode: 2,
        errMessage: "Service not found",
      });
    }

    // check if there is still any doctor registered for this branch
    let doctor = await db.Doctor.findOne({
      where: { serviceId: service.id },
    });

    if (doctor) {
      resolve({
        errCode: 2,
        errMessage: "There is doctor registered with this service. Consider remove all associated doctors before deleting this service.",
      });
    } else {
      await db.Service.destroy({
        where: { id: serviceId },
      });

      resolve({
        errCode: 0,
        message: "Service is deleted",
      });
    }
  });
};

// Manage Doctor
let createDoctor = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let findDoctor = await db.Doctor.findOne({
        where: { userId: data.id },
      });

      // check existing doctor
      if (findDoctor) {
        resolve({
          errCode: 1,
          errMessage: "Doctor already exists!",
        });
      } else {
        let doctor = await db.Doctor.create({
          userId: data.id,
          about: data.about,
          serviceId: data.serviceId,
          branchId: data.branchId,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender === "1" ? true : false,
        });
        resolve({
          errCode: 0,
          message: "Created doctor successfully!",
          doctor: doctor,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDoctors = async (doctorUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = "";
      if (doctorUserId === "ALL") {
        doctors = await db.Doctor.findAll({
          attributes: {
            include: [
              "userId",
              "serviceId",
              "branchId",
              "about",
              "gender",
              "firstName",
              "lastName",
              [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), "createdAt"],
              "updatedAt",
            ],
          },
        });
      }

      if (doctorUserId && doctorUserId !== "ALL") {
        doctors = await db.Doctor.findOne({
          where: { userId: doctorUserId },
          attributes: {
            include: [
              "userId",
              "serviceId",
              "branchId",
              "about",
              "gender",
              "firstName",
              "lastName",
              [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), "createdAt"],
              "updatedAt",
            ],
          },
        });
      }
      resolve(doctors);
    } catch (e) {
      reject(e);
    }
  });
};

let editDoctor = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }

      let doctor = await db.Doctor.findOne({
        where: { userId: data.userId },
        raw: false,
      });
      if (doctor) {
        doctor.about = data.about;
        doctor.serviceId = data.serviceId;
        doctor.branchId = data.branchId;

        await doctor.save();
        resolve({
          errCode: 0,
          message: "Update doctor information successfully!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Doctor not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteDoctor = async (doctorUserId) => {
  return new Promise(async (resolve, reject) => {
    let doctor = await db.Doctor.findOne({
      where: { userId: doctorUserId },
    });

    if (!doctor) {
      resolve({
        errCode: 2,
        errMessage: "Doctor not found",
      });
    }

    await db.Doctor.destroy({
      where: { userId: doctorUserId },
    });

    resolve({
      errCode: 0,
      message: "Delete doctor successfully!",
    });
  });
};

// Manage Log
let addLog = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newLog = await db.Log.create({
        userId: data.userId,
        actionType: data.actionType,
        message: data.message,
      });
      resolve({
        errCode: 0,
        message: "New log recorded",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllLogs = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let logs = "";
      logs = await db.Log.findAll({
        attributes: {
          include: ["userId", "actionType", "message", [sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), "createdAt"], "updatedAt"],
        },
      });

      resolve(logs);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUserByAdmin: createNewUserByAdmin,
  getAllUsers: getAllUsers,
  deleteUserByAdmin: deleteUserByAdmin,
  editSystemUserByAdmin: editSystemUserByAdmin,

  createNewBranch: createNewBranch,
  getAllBranches: getAllBranches,
  editBranch: editBranch,
  deleteBranch: deleteBranch,

  createNewService: createNewService,
  getAllServices: getAllServices,
  editService: editService,
  deleteService: deleteService,

  createDoctor: createDoctor,
  getAllDoctors: getAllDoctors,
  editDoctor: editDoctor,
  deleteDoctor: deleteDoctor,

  addLog: addLog,
  getAllLogs: getAllLogs,
};
