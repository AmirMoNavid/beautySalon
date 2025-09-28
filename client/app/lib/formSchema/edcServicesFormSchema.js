import * as Yup from "yup";

export const edcServicesFormSchema = {
  shortDesc: Yup.string().required("متن کوتاه خدمات الزامی است"),
};
