import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Write from "./articleModel.js";

const { DataTypes } = Sequelize;

const Comments = db.define(
  "comments",
  {
    shortDesc: {
      type: DataTypes.TEXT,
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

// Write.hasMany(Comments);
// Comments.belongsTo(Write, { foreignKey: "newsId" });

export default Comments;
