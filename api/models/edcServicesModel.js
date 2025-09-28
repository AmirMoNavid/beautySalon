import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Write from "./articleModel.js";

const { DataTypes } = Sequelize;

const EdcServices = db.define(
  "edcservices",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default EdcServices;
