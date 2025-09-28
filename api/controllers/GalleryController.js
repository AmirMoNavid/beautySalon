import Gallery from "../models/galleryModel.js";
import path from "path";
import fs from "fs";
import { paths } from "../config/Paths.js";

export const getAllGallerys = async (req, res) => {
  const { count } = req.query;

  if (!isNaN(count)) {
    const gallerysCount = await Gallery.count();
    return res.send(gallerysCount.toString());
  }

  try {
    const gallerys = await Gallery.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(gallerys);
  } catch (error) {
    console.log(error);
  }
};

export const createGallery = async (req, res) => {
  if (req.files == null)
    return res.status(404).json({ title: "عکسی انتخاب نکردید." });
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
      await Gallery.create({
        image: fileName,
        url: url,
      });
      res.json({ title: "مطلب با موفقیت بارگذاری شد." });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateGallery = async (req, res) => {
  const gallery = await Gallery.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!gallery) return res.status(400).json({ title: "دیتایی وجود ندارد." });

  let fileName = "";
  if (req.files === null) {
    fileName = gallery.image;
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

    const filePath = path.join(paths.publicDir, "images", gallery.image);

    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log(err);
    }
    file.mv(path.join(paths.publicDir, "images", fileName), async (err) => {
      if (err) return res.status(400).json({ title: err.message });
    });
  }

  const url = `/api/uploads/images/${fileName}`;

  try {
    await Gallery.update(
      {
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ title: "گالری با موفقیت ویرایش شد." });
  } catch (error) {
    console.log(error);
  }
};

export const getGallery = async (req, res) => {
  try {
    const id = req.params.id;
    const gallery = await Gallery.findOne({
      where: {
        id: id,
      },
    });
    res.json(gallery);
  } catch (error) {
    res.json(error);
  }
};
export const deleteGallery = async (req, res) => {
  try {
    await Gallery.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "گالری با موفقیت حذف شد." });
  } catch (error) {
    res.json(error);
  }
};
