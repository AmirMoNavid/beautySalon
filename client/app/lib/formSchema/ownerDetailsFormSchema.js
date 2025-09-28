import * as Yup from "yup";

export const ownerDetailsFormSchema = {
  aboutSalon: Yup.string().required("عنوان الزامی است"),
  aboutOwner: Yup.string().required("توضیحات کوتاه الزامی است"),
  desc: Yup.string().required("توضیحات الزامی است"),
};
