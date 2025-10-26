import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
import { join } from "path";

dotenv.config({
  path: join(__dirname, ".env"),
});

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME ?? "localhost",
    dialect: "mysql",
    define: {
      freezeTableName: true,
    },
    logging: false,
  }
);

export default db;
