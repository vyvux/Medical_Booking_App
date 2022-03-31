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
        value: "7.30 - 8.30 AM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T2",
        value: "8.30 - 9.30 AM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T3",
        value: "9.30 - 10.30 AM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T4",
        value: "10.30 - 11.30 AM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T5",
        value: "1.30 - 2.30 PM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T6",
        value: "2.30 - 3.30 PM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "time",
        key: "T6",
        value: "3.30 - 4.30 PM",
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
        key: "A5",
        value: "Edit patient profile",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A6",
        value: "Add doctor available hours",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "actionType",
        key: "A7",
        value: "Remove doctor available hours",
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
