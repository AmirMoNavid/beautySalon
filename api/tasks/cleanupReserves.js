import cron from "node-cron";
import moment from "jalali-moment";
import Reserve from "../models/reserveModel.js";

const cleanupReserves = async () => {
  try {
    const reserves = await Reserve.findAll({
      attributes: ["id", "reserveDate", "reserveTime"],
    });

    const now = moment().utcOffset(210);
    const today = now.format("jYYYY/jMM/jDD");
    const currentMinutes =
      Number(now.format("HH")) * 60 + Number(now.format("mm"));

    for (const reserve of reserves) {
      const { reserveDate, reserveTime } = reserve;

      if (!/^\d{4}\/\d{2}\/\d{2}$/.test(reserveDate)) {
        console.warn("Invalid reserve date:", reserve.id, reserveDate);
        continue;
      }

      const [, endTime] = reserveTime.split(" - ");

      if (!endTime || !/^\d{2}:\d{2}$/.test(endTime)) {
        console.warn("Invalid reserve time:", reserve.id, reserveTime);
        continue;
      }

      const [endHour, endMinute] = endTime.split(":").map(Number);
      const expirationMinutes = endHour * 60 + endMinute + 30;

      if (reserveDate < today) {
        await reserve.destroy();
        console.log("Expired reserve deleted:", reserve.id);
        continue;
      }

      if (reserveDate > today) continue;

      if (currentMinutes >= expirationMinutes) {
        await reserve.destroy();
        console.log("Expired reserve deleted:", reserve.id);
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
