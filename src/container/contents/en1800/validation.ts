import * as yup from "yup";

export const schema = yup.object({
  areaCode: yup
    .string()
    .typeError("This field is required")
    .matches(/[0-9]+/gi, "Enter number only")
    .length(2, "must be 2 digits"),
  jyCode: yup
    .string()
    .typeError("This field is required")
    .matches(/[0-9]+/gi, "Enter number only")
    .length(2, "must be 2 digits"),
  jyName: yup.string().nullable().max(10, "too long"),
  jyBigo: yup.string().nullable().max(20, "too long"),
});