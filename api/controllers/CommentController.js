import Comments from "../models/commentModel.js";
import path from "path";
import fs from "fs";
import { paths } from "../config/Paths.js";

export const getAllComments = async (req, res) => {
  const { count } = req.query;

  if (!isNaN(count)) {
    const commentsCount = await Comments.count();
    return res.send(commentsCount.toString());
  }

  try {
    const comments = await Comments.findAll({});
    res.json(comments);
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (req, res) => {
  if (req.files == null)
    return res.status(404).json({ title: "عکسی انتخاب نکردید." });
  const { shortDesc } = req.body;
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
  // `./public/images/${fileName}`
  file.mv(filePath, async (err) => {
    if (err) return res.status(400).json({ title: err.message });
    try {
      await Comments.create({
        shortDesc: shortDesc,
        image: fileName,
        url: url,
      });
      res.json({ title: "کامنت با موفقیت بارگذاری شد." });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateComment = async (req, res) => {
  const comment = await Comments.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!comment) return res.status(400).json({ title: "دیتایی وجود ندارد." });

  let fileName = "";
  if (req.files === null) {
    fileName = comment.image;
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

    const filePath = path.join(paths.publicDir, "images", comment.image);
    // const filePath = `./public/images/${article.image}`;

    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log(err);
    }
    // `./public/images/${fileName}`
    file.mv(path.join(paths.publicDir, "images", fileName), async (err) => {
      if (err) return res.status(400).json({ title: err.message });
    });
  }

  const shortDesc = req.body.shortDesc;

  const url = `/api/uploads/images/${fileName}`;

  try {
    await Comments.update(
      {
        shortDesc: shortDesc,

        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ title: "کامنت با موفقیت ویرایش شد." });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comments.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "نظر با موفقیت حذف شد." });
  } catch (error) {
    res.json(error);
  }
};

export const active = async (req, res) => {
  const { isactive, id } = req.params;
  const isActiveNum = Number(isactive);

  if (isNaN(isActiveNum) || isActiveNum > 1 || isActiveNum < 0) {
    return res.status(400).json("isactive میبایست عدد 0 یا 1 باشد.");
  }

  try {
    await Comments.update(
      { isActive: Boolean(isActiveNum) },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json("نظر فعال شد.");
  } catch (error) {
    res.json(error);
  }
};

export const deActivate = async (req, res) => {
  const { isActive } = req.body;
  try {
    await Comments.update(
      { isActive: isActive },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json("نظر غیرفعال شد.");
  } catch (error) {
    res.json(error);
  }
};

export const getComment = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comments.findOne({
      where: {
        id: id,
      },
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
};
