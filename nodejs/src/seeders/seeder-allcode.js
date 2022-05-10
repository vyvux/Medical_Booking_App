"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Allcodes", [
      {
        type: "role",
        key: "R1",
        value: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "role",
        key: "R2",
        value: "Doctor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "role",
        key: "R3",
        value: "Patient",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "role",
        key: "R4",
        value: "Medical Staff",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "status",
        key: "S1",
        value: "Processing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "status",
        key: "S2",
        value: "Confirmed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "status",
        key: "S3",
        value: "Finished",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "status",
        key: "S4",
        value: "Cancelled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T1",
        value: "7.00 - 8.00 AM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T2",
        value: "8.00 - 9.00 AM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T3",
        value: "9.00 - 10.00 AM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T4",
        value: "10.00 - 11.00 AM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T5",
        value: "1.00 - 2.00 PM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T6",
        value: "2.00 - 3.00 PM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T7",
        value: "3.00 - 4.00 PM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A1",
        value: "Add appointment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A2",
        value: "Cancel appointment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A3",
        value: "Create user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A4",
        value: "Delete user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A5",
        value: "Edit user information",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A6",
        value: "Edit patient profile",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A7",
        value: "Edit doctor available hours",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A8",
        value: "User login",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A9",
        value: "Create patient profile",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A10",
        value: "Register doctor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A11",
        value: "Edit doctor profile",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A12",
        value: "Delete doctor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A13",
        value: "Add clinic information",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A14",
        value: "Edit clinic information",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A15",
        value: "Delete clinic information",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "gender",
        key: "0",
        value: "Female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "gender",
        key: "1",
        value: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Allcodes", null, {});
  },
};
