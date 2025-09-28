import path from "path";
import { paths } from "../config/Paths.js";
import OwnerDetails from "../models/ownerModell.js";
import fs from "fs";

export const getDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const detail = await OwnerDetails.findOne({
      where: {
        id: id,
      },
    });
    res.json(detail);
  } catch (error) {
    res.json(error);
  }
};

export const createDetail = async (req, res) => {
  if (req.files == null)
    return res.status(404).json({ title: "عکسی انتخاب نکردید." });
  const { aboutsalon, aboutowner } = req.body;

  const file = req.files?.file;
  const file2 = req.files?.file2;

  const fileSize = file?.data?.length;
  const fileSize2 = file2?.data?.length;

  const ext = path.extname(file?.name);
  const ext2 = path.extname(file2?.name);

  let dateNow = Math.round(Date.now());
  const fileName = dateNow + ext;
  const file2Name = dateNow + "_2" + ext2; // برای جلوگیری از همپوشانی نام فایل‌ها

  const url = `/api/uploads/images/${fileName}`;
  const url2 = `/api/uploads/images/${file2Name}`;

  const allowedType = [".png", ".jpg", ".jpeg", ".webp"];

  if (
    !allowedType.includes(ext.toLowerCase()) ||
    !allowedType.includes(ext2.toLowerCase())
  ) {
    return res.status(400).json({
      title: "عکس نامعتبر است ، فرمت مجاز .jpg .jpeg .webp .png می باشد.",
    });
  }

  if (fileSize > 3000000 || fileSize2 > 3000000)
    return res
      .status(400)
      .json({ title: "حجم عکس نباید بیشتر از 3 مگابایت باشد" });

  const filePath = path.join(paths.publicDir, "images", fileName);
  const file2Path = path.join(paths.publicDir, "images", file2Name);

  file.mv(filePath, (err) => {
    if (err) return res.status(400).json({ title: err.message });

    file2.mv(file2Path, async (err2) => {
      if (err2) return res.status(400).json({ title: err2.message });

      try {
        await OwnerDetails.create({
          aboutsalon: aboutsalon,
          aboutowner: aboutowner,
          image: fileName,
          url: url,
          image2: file2Name, // اضافه کردن فیلد دوم
          url2: url2,
        });
        res.json({ title: "اطلاعات با موفقیت بارگذاری شد." });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ title: "خطا در ثبت اطلاعات در دیتابیس." });
      }
    });
  });
};

export const updateDetail = async (req, res) => {
  const detail = await OwnerDetails.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!detail) return res.status(400).json({ title: "دیتایی وجود ندارد." });

  let fileName = "";
  let file2Name = detail.image2 || ""; // بررسی برای فایل دوم

  if (!req.files?.file) {
    fileName = detail.image;
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

    if (detail.image) {
      const filePath = path.join(paths.publicDir, "images", detail.image);

      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.log(err);
      }
    }

    // انتقال فایل جدید به دایرکتوری
    await file.mv(path.join(paths.publicDir, "images", fileName));
  }

  // برای فایل دوم (file2)

  if (!req.files?.file2) {
    file2Name = detail.image2;
  } else {
    const file2 = req.files?.file2;
    const file2Size = file2?.data?.length;
    const ext2 = path.extname(file2?.name);
    let dateNow = Math.round(Date.now());
    file2Name = dateNow + "_2" + ext2; // برای جلوگیری از همپوشانی

    const allowedType = [".png", ".jpg", ".jpeg", ".webp"];

    if (!allowedType.includes(ext2.toLowerCase())) {
      return res.status(400).json({
        title: "عکس نامعتبر است ، فرمت مجاز .jpg .jpeg .webp .png می باشد.",
      });
    }
    if (file2Size > 3000000)
      return res
        .status(400)
        .json({ title: "حجم عکس نباید بیشتر از 3 مگابایت باشد" });

    if (detail.image2) {
      const file2Path = path.join(paths.publicDir, "images", detail.image2);

      try {
        fs.unlinkSync(file2Path); // حذف فایل قبلی دوم
      } catch (err) {
        console.log(err);
      }
    }

    // انتقال فایل دوم به دایرکتوری
    await file2.mv(path.join(paths.publicDir, "images", file2Name));
  }

  const { aboutowner, aboutsalon } = req.body;

  const url = `/api/uploads/images/${fileName}`;
  const url2 = `/api/uploads/images/${file2Name}`;

  try {
    // آپدیت کردن رکورد در دیتابیس
    await OwnerDetails.update(
      {
        aboutowner: aboutowner,
        aboutsalon: aboutsalon,
        image: fileName,
        url: url,
        image2: file2Name, // ذخیره کردن نام فایل دوم
        url2: url2, // ذخیره کردن URL فایل دوم
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ title: "اطلاعات با موفقیت ویرایش شد." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ title: "خطا در ویرایش اطلاعات." });
  }
};

export const deleteDetail = async (req, res) => {
  try {
    await OwnerDetails.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "اطلاعات با موفقیت حذف شد." });
  } catch (error) {
    res.json(error);
  }
};
