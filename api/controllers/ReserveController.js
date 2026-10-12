import Reserve from "../models/reserveModel.js";
import { reserveSlots } from "../config/reserveSlots.js";

export const getAllReserves = async (req, res) => {
  const { count } = req.query;

  if (!isNaN(count)) {
    const reservesCount = await Reserve.count();
    return res.send(reservesCount.toString());
  }

  try {
    const reserves = await Reserve.findAll({});
    res.json(reserves);
  } catch (error) {
    console.log(error);
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
    await Reserve.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "رزرو با موفقیت حذف شد." });
  } catch (error) {
    res.json(error);
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
      return res.status(400).json({
        message: "تاریخ معتبر نیست",
      });
    }

    const reserves = await Reserve.findAll({
      where: { reserveDate: date },
      attributes: ["reserveTime"],
    });

    const bookedTimes = new Set(reserves.map(({ reserveTime }) => reserveTime));

    const availableTimes = reserveSlots.filter(
      (time) => !bookedTimes.has(time),
    );

    return res.status(200).json({
      date,
      availableTimes,
    });
  } catch (error) {
    console.error(error);

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
