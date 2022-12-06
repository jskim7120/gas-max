import * as yup from "yup";

export const schema = yup.object({
  areaCode: yup.string().typeError("fdd"),
});
