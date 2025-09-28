import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import ConfigPort from "./config/ConfigPort.js";
import db from "./config/Database.js";
import categoryRoutes from "./routes/categoryRoute.js";
import commentRoutes from "./routes/commentRoute.js";
import userRoutes from "./routes/userRoute.js";
import articleRoutes from "./routes/articleRoute.js";
import uploadFileRoutes from "./routes/uploadFileRoute.js";
import numberRoutes from "./routes/numberRoute.js";
import edcServiesRoutes from "./routes/edcServicesRoute.js";
import servicesRoutes from "./routes/servicesRoute.js";
import ownerDetailsRoutes from "./routes/ownerDetailsRoute.js";
import galleryRoutes from "./routes/galleryRoute.js";
import salonRoutes from "./routes/salonRoute.js";
import reserveRoutes from "./routes/reserveRoute.js";

import logger from "morgan";

const app = express();

try {
  await db.authenticate();
  console.log("database connected");
} catch (error) {
  console.log(error);
}

const { port, allowedDomains } = ConfigPort;

app.use(
  cors({
    credentials: true,
    origin: [allowedDomains],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", uploadFileRoutes);
app.use("/api", articleRoutes);
app.use("/api", commentRoutes);
app.use("/api", numberRoutes);
app.use("/api", edcServiesRoutes);
app.use("/api", ownerDetailsRoutes);
app.use("/api", galleryRoutes);
app.use("/api", salonRoutes);
app.use("/api", servicesRoutes);
app.use("/api", reserveRoutes);

app.listen(port, () => console.log(`server is running on port ${port}`));
