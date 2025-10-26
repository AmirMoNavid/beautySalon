import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
import { join } from "path";

dotenv.config({
  path: join(__dirname, ".env"),
});

const ConfigPort = {
  port: process.env.PORT || 5000,
  allowedDomains:
    process.env.NODE_ENV === "production"
      ? process.env.REMOTE_SERVER_API
      : process.env.LOCAL_SERVER_API,
};
export default ConfigPort;
