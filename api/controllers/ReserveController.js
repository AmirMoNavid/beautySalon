import Reserve from "../models/reserveModel.js";

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
