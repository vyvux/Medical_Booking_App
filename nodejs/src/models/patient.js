"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init(
    {
      dob: DataTypes.DATE,
      phoneNumber: DataTypes.INTEGER,
      address: DataTypes.STRING,
      allergy: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      gender: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
