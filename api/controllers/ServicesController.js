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
  const { title, durationMinutes = 60 } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    !Number.isInteger(Number(durationMinutes)) ||
    Number(durationMinutes) < 30
  ) {
    return res.status(400).json({
      title: "عنوان و مدت زمان معتبر الزامی است.",
    });
  }

  try {
    await Services.create({
      title,
      durationMinutes: Number(durationMinutes),
    });

    return res.status(201).json({
      title: "خدمت با موفقیت ثبت شد.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      title: "خطا در ثبت خدمت.",
    });
  }
};

export const updateService = async (req, res) => {
  const service = await Services.findByPk(req.params.id);

  if (!service) {
    return res.status(404).json({
      title: "خدمت موردنظر پیدا نشد.",
    });
  }

  const { title, durationMinutes } = req.body;

  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    return res.status(400).json({
      title: "عنوان خدمت معتبر نیست.",
    });
  }

  if (
    durationMinutes !== undefined &&
    (!Number.isInteger(Number(durationMinutes)) || Number(durationMinutes) < 30)
  ) {
    return res.status(400).json({
      title: "مدت زمان باید حداقل ۳۰ دقیقه باشد.",
    });
  }

  try {
    await service.update({
      ...(title !== undefined && { title }),
      ...(durationMinutes !== undefined && {
        durationMinutes: Number(durationMinutes),
      }),
    });

    return res.json({
      title: "خدمت با موفقیت ویرایش شد.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      title: "خطا در ویرایش خدمت.",
    });
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
