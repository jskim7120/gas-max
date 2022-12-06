import * as yup from "yup";

export const schema = yup.object({
  cuCode: yup.number().typeError("required").required(),
});
