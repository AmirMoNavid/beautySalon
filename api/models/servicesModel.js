import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Services = db.define(
  "services",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 60,
      validate: {
        min: 30,
        isInt: true,
      },
    },
  },
  {
    freezeTableName: true,
  },
);

export default Services;
