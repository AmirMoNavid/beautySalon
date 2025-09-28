import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Write from "./articleModel.js";

const { DataTypes } = Sequelize;

const Services = db.define(
  "services",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Services;
