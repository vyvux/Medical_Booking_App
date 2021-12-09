"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription_Drug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Prescription_Drug.init(
    {
      prescriptionId: DataTypes.INTEGER,
      drugId: DataTypes.INTEGER,
      direction: DataTypes.TEXT,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Prescription_Drug",
    }
  );
  return Prescription_Drug;
};
