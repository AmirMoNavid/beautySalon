import Reserve from "../models/reserveModel.js";
import { reserveSlots } from "../config/reserveSlots.js";
import moment from "jalali-moment";

export const getAllReserves = async (req, res) => {
  const { count } = req.query;

  if (!isNaN(count)) {
    const reservesCount = await Reserve.count();
    return res.send(reservesCount.toString());
  }

  try {
    const reserves = await Reserve.findAll({
      order: [["id", "DESC"]],
    });

    return res.json(reserves);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "خطا در دریافت رزروها" });
  }
};

export const createReserve = async (req, res) => {
  const { reserveTime, reserveDate, service, number, name } = req.body;

  try {
    await Reserve.create({
      reserveTime: reserveTime,
      reserveDate: reserveDate,
      service: service,
      number: number,
      name: name,
    });
    res.json({ title: "رزرو با موفقیت بارگذاری شد." });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteReserve = async (req, res) => {
  try {
    const deletedCount = await Reserve.destroy({
      where: {
        id: req.params.id,
      },
    });

    console.log("Requested ID:", req.params.id);
    console.log("Deleted count:", deletedCount);

    if (deletedCount === 0) {
      return res.status(404).json({
        title: "رزرو موردنظر پیدا نشد.",
      });
    }

    return res.status(200).json({
      title: "رزرو با موفقیت حذف شد.",
    });
  } catch (error) {
    console.error("Delete reserve error:", error);

    return res.status(500).json({
      title: "خطا در حذف رزرو.",
    });
  }
};

export const getReserve = async (req, res) => {
  try {
    const id = req.params.id;
    const reserve = await Reserve.findOne({
      where: {
        id: id,
      },
    });
    res.json(reserve);
  } catch (error) {
    res.json(error);
  }
};

export const getAvailableReserveTimes = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date || !/^\d{4}\/\d{2}\/\d{2}$/.test(date)) {
      return res.status(400).json({ message: "تاریخ معتبر نیست" });
    }

    const reserves = await Reserve.findAll({
      where: { reserveDate: date },
      attributes: ["reserveTime"],
    });

    const bookedTimes = new Set(reserves.map((reserve) => reserve.reserveTime));

    const now = moment();

    const availableTimes = reserveSlots.filter((time) => {
      if (bookedTimes.has(time)) return false;

      const [startTime] = time.split(" - ");

      const slotStart = moment.from(date, "fa", "YYYY/MM/DD").set({
        hour: Number(startTime.split(":")[0]),
        minute: Number(startTime.split(":")[1]),
        second: 0,
        millisecond: 0,
      });

      console.log({
        date,
        time,
        slotStart: slotStart.format("jYYYY/jMM/jDD HH:mm"),
        valid: slotStart.isValid(),
        now: moment().format("jYYYY/jMM/jDD HH:mm"),
      });

      return slotStart.isValid() && moment().isBefore(slotStart);
    });

    return res.status(200).json({ date, availableTimes });
  } catch (error) {
    console.error("Available reserve times error:", error);

    return res.status(500).json({
      message: "خطا در دریافت تایم‌های آزاد",
    });
  }
};

// export const updateReserve = async (req, res) => {
//   const article = await Reserve.findOne({
//     where: {
//       id: req.params.id,
//     },
//   });
//   if (!article) return res.status(400).json({ title: "دیتایی وجود ندارد." });

//   const { reserveTime, reserveDate, service, number, name } = req.body;

//   try {
//     await Reserve.update(
//       {
//         reserveTime: reserveTime,
//         reserveDate: reserveDate,
//         service: service,
//         number: `0${number}`,
//         name: name,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     res.json({ title: "رزرو با موفقیت ویرایش شد." });
//   } catch (error) {
//     console.log(error);
//   }
// };
