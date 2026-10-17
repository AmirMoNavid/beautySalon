import Reserve from "../models/reserveModel.js";
import Services from "../models/servicesModel.js";
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

const toMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const formatTime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const parseReserveTime = (reserveTime) => {
  const [start, end] = reserveTime.split(" - ");

  if (
    !start ||
    !end ||
    !/^\d{2}:\d{2}$/.test(start) ||
    !/^\d{2}:\d{2}$/.test(end)
  ) {
    return null;
  }

  return {
    start: toMinutes(start),
    end: toMinutes(end),
  };
};

const getWorkingHours = () => {
  const slots = reserveSlots.map(parseReserveTime).filter(Boolean);

  if (!slots.length) {
    throw new Error("No working hours configured");
  }

  return {
    open: Math.min(...slots.map((slot) => slot.start)),
    close: Math.max(...slots.map((slot) => slot.end)),
  };
};

const getSlotStart = (date, time) => {
  const [hour, minute] = time.split(":").map(Number);

  return moment.from(date, "fa", "YYYY/MM/DD").set({
    hour,
    minute,
    second: 0,
    millisecond: 0,
  });
};

const isValidDate = (date) => {
  if (!date || !/^\d{4}\/\d{2}\/\d{2}$/.test(date)) {
    return false;
  }

  const parsed = moment.from(date, "fa", "YYYY/MM/DD");

  return parsed.isValid() && parsed.format("jYYYY/jMM/jDD") === date;
};

const hasOverlap = (start, end, reserves) => {
  return reserves.some((reserve) => {
    const booked = parseReserveTime(reserve.reserveTime);

    if (!booked) return true;

    return start < booked.end && end > booked.start;
  });
};

export const getAvailableReserveTimes = async (req, res) => {
  try {
    const { date, serviceId } = req.query;

    if (!isValidDate(date)) {
      return res.status(400).json({
        message: "تاریخ معتبر نیست",
      });
    }

    const service = await Services.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({
        message: "خدمت موردنظر پیدا نشد",
      });
    }

    const duration = service.durationMinutes;
    const { open, close } = getWorkingHours();

    const reserves = await Reserve.findAll({
      where: { reserveDate: date },
      attributes: ["reserveTime"],
    });

    const now = moment();
    const availableTimes = [];

    for (let start = open; start + duration <= close; start += duration) {
      const end = start + duration;

      if (hasOverlap(start, end, reserves)) {
        continue;
      }

      const startTime = formatTime(start);
      const slotStart = getSlotStart(date, startTime);

      if (!slotStart.isValid() || !now.isBefore(slotStart)) {
        continue;
      }

      availableTimes.push(`${startTime} - ${formatTime(end)}`);
    }

    return res.status(200).json({
      date,
      serviceId: service.id,
      durationMinutes: duration,
      availableTimes,
    });
  } catch (error) {
    console.error("Available reserve times error:", error);

    return res.status(500).json({
      message: "خطا در دریافت تایم‌های آزاد",
    });
  }
};

export const createReserve = async (req, res) => {
  try {
    const { reserveTime, reserveDate, service, number, name } = req.body;

    if (
      !isValidDate(reserveDate) ||
      !reserveTime ||
      !service ||
      !number ||
      !name
    ) {
      return res.status(400).json({
        title: "اطلاعات رزرو معتبر نیست.",
      });
    }

    const serviceRecord = await Services.findOne({
      where: { title: service },
    });

    if (!serviceRecord) {
      return res.status(400).json({
        title: "خدمت موردنظر پیدا نشد.",
      });
    }

    const parsed = parseReserveTime(reserveTime);

    if (!parsed) {
      return res.status(400).json({
        title: "ساعت رزرو معتبر نیست.",
      });
    }

    const start = parsed.start;
    const end = start + serviceRecord.durationMinutes;
    const { open, close } = getWorkingHours();

    if (start < open || end > close || start % 30 !== 0 || end <= start) {
      return res.status(400).json({
        title: "بازه زمانی رزرو معتبر نیست.",
      });
    }

    const expectedReserveTime = `${formatTime(start)} - ${formatTime(end)}`;

    const slotStart = getSlotStart(reserveDate, formatTime(start));

    if (!slotStart.isValid() || !moment().isBefore(slotStart)) {
      return res.status(400).json({
        title: "زمان انتخاب‌شده گذشته است.",
      });
    }

    const reserves = await Reserve.findAll({
      where: { reserveDate },
      attributes: ["reserveTime"],
    });

    if (hasOverlap(start, end, reserves)) {
      return res.status(409).json({
        title: "این بازه زمانی قبلاً رزرو شده است.",
      });
    }

    await Reserve.create({
      reserveTime: expectedReserveTime,
      reserveDate,
      service,
      number,
      name,
    });

    return res.status(201).json({
      title: "رزرو با موفقیت ثبت شد.",
    });
  } catch (error) {
    console.error("Create reserve error:", error);

    return res.status(500).json({
      title: "خطا در ثبت رزرو.",
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
