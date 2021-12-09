"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Availability.init(
    {
      doctorId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      time: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Availability",
    }
  );
  return Availability;
};
