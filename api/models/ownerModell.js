import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const OwnerDetails = db.define(
  "owner",
  {
    aboutsalon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aboutowner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    url2: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default OwnerDetails;
