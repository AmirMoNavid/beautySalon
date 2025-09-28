import * as Yup from "yup";

export const commentSchema = {
  description: Yup.string().required("توضیحات الزامی است"),
};
