import cron from "node-cron";
import moment from "jalali-moment";
import Reserve from "../models/ReserveModel.js";

const cleanupReserves = async () => {
  try {
    const reserves = await Reserve.findAll({
      attributes: ["id", "reserveDate", "reserveTime"],
    });

    const now = moment();

    for (const reserve of reserves) {
      const [, endTime] = reserve.reserveTime.split(" - ");

      const expirationTime = moment(
        `${reserve.reserveDate} ${endTime}`,
        "jYYYY/jMM/jDD HH:mm",
        true,
      );

      if (!expirationTime.isValid()) {
        continue;
      }

      expirationTime.add(30, "minutes");

      if (now.isSameOrAfter(expirationTime)) {
        await reserve.destroy();
      }
    }
  } catch (error) {
    console.error("Reserve cleanup failed:", error);
  }
};

cron.schedule("* * * * *", cleanupReserves, {
  noOverlap: true,
});

export default cleanupReserves;
