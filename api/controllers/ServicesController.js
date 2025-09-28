import Services from "../models/servicesModel.js";
import path from "path";
import fs from "fs";
import { paths } from "../config/Paths.js";

export const getAllServices = async (req, res) => {
  const { count } = req.query;

  if (!isNaN(count)) {
    const servicesCount = await Services.count();
    return res.send(servicesCount.toString());
  }

  try {
    const services = await Services.findAll({});
    res.json(services);
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (req, res) => {
  const { title } = req.body;
  try {
    await Services.create({
      title: title,
    });
    res.json({ title: "مطلب با موفقیت بارگذاری شد." });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteService = async (req, res) => {
  try {
    await Services.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "سرویس با موفقیت حذف شد." });
  } catch (error) {
    res.json(error);
  }
};

export const updateService = async (req, res) => {
  const service = await Services.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!service) return res.status(400).json({ title: "دیتایی وجود ندارد." });

  const title = req.body.title;

  try {
    await Services.update(
      {
        title: title,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ title: "سرویس با موفقیت ویرایش شد." });
  } catch (error) {
    console.log(error);
  }
};

export const getService = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Services.findOne({
      where: {
        id: id,
      },
    });
    res.json(service);
  } catch (error) {
    res.json(error);
  }
};
