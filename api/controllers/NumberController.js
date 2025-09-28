import Numbers from "../models/numberModel.js";

export const getAllNumbers = async (req, res) => {
  const { count } = req.query;

  if (!isNaN(count)) {
    const numbersCount = await Numbers.count();
    return res.send(numbersCount.toString());
  }

  try {
    const numbers = await Numbers.findAll({});
    res.json(numbers);
  } catch (error) {
    console.log(error);
  }
};

export const createNumber = async (req, res) => {
  const { number } = req.body;

  try {
    await Numbers.create({
      number: `0${number}`,
    });
    res.json({ title: "شماره با موفقیت بارگذاری شد." });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateNumber = async (req, res) => {
  let newNumber = req.body.number;

  try {
    await Numbers.update(
      {
        number: `0${newNumber}`,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ title: "شماره با موفقیت ویرایش شد." });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNumber = async (req, res) => {
  try {
    await Numbers.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "شماره با موفقیت حذف شد." });
  } catch (error) {
    res.json(error);
  }
};

export const getNumber = async (req, res) => {
  try {
    const id = req.params.id;
    const number = await Numbers.findOne({
      where: {
        id: id,
      },
    });
    res.json(number);
  } catch (error) {
    res.json(error);
  }
};
