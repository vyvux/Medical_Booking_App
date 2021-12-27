"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor.init(
    {
      userId: DataTypes.INTEGER,
      about: DataTypes.TEXT,
      serviceId: DataTypes.INTEGER,
      branchId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
