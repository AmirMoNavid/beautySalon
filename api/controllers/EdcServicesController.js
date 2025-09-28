import EdcServices from "../models/edcServicesModel.js";
import path from "path";
import fs from "fs";
import { paths } from "../config/Paths.js";

export const getAllEdcServices = async (req, res) => {
  const { count } = req.query;

  if (!isNaN(count)) {
    const servicesCount = await EdcServices.count();
    return res.send(servicesCount.toString());
  }

  try {
    const services = await EdcServices.findAll({});
    res.json(services);
  } catch (error) {
    console.log(error);
  }
};

export const createEdcService = async (req, res) => {
  if (req.files == null)
    return res.status(404).json({ title: "عکسی انتخاب نکردید." });
  const { title } = req.body;
  const file = req.files?.file;

  const fileSize = file?.data?.length;
  const ext = path.extname(file?.name);
  let dateNow = Math.round(Date.now());
  const fileName = dateNow + ext;
  const url = `/api/uploads/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg", ".webp"];
  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(400).json({
      title: "عکس نامعتبر است ، فرمت مجاز .jpg .jpeg .webp .png می باشد.",
    });
  }
  if (fileSize > 3000000)
    return res
      .status(400)
      .json({ title: "حجم عکس نباید بیشتر از 3 مگابایت باشد" });

  const filePath = path.join(paths.publicDir, "images", fileName);
  file.mv(filePath, async (err) => {
    if (err) return res.status(400).json({ title: err.message });
    try {
      await EdcServices.create({
        title: title,
        image: fileName,
        url: url,
      });
      res.json({ title: "مطلب با موفقیت بارگذاری شد." });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const deleteEdcService = async (req, res) => {
  try {
    await EdcServices.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "سرویس با موفقیت حذف شد." });
  } catch (error) {
    res.json(error);
  }
};

export const updateEdcService = async (req, res) => {
  const service = await EdcServices.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!service) return res.status(400).json({ title: "دیتایی وجود ندارد." });

  let fileName = "";
  if (req.files === null) {
    fileName = service.image;
  } else {
    const file = req.files?.file;
    const fileSize = file?.data?.length;
    const ext = path.extname(file?.name);
    let dateNow = Math.round(Date.now());
    fileName = dateNow + ext;
    const allowedType = [".png", ".jpg", ".jpeg", ".webp"];
    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(400).json({
        title: "عکس نامعتبر است ، فرمت مجاز .jpg .jpeg .webp .png می باشد.",
      });
    }
    if (fileSize > 3000000)
      return res
        .status(400)
        .json({ title: "حجم عکس نباید بیشتر از 3 مگابایت باشد" });

    const filePath = path.join(paths.publicDir, "images", service.image);

    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log(err);
    }
    file.mv(path.join(paths.publicDir, "images", fileName), async (err) => {
      if (err) return res.status(400).json({ title: err.message });
    });
  }

  const title = req.body.title;

  const url = `/api/uploads/images/${fileName}`;

  try {
    await EdcServices.update(
      {
        title: title,
        image: fileName,
        url: url,
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

export const getEdcService = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await EdcServices.findOne({
      where: {
        id: id,
      },
    });
    res.json(service);
  } catch (error) {
    res.json(error);
  }
};
