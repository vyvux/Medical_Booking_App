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
          message: "OK. New user created",
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
        message: "created new branch",
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
        errCode: 2,
        errMessage: "Branch not found",
      });
    }

    await db.Branch.destroy({
      where: { id: branchId },
    });

    resolve({
      errCode: 0,
      message: "Branch is deleted",
    });
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
};
