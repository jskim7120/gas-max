import * as yup from "yup";

export const schema = yup.object({
  // areaCode: yup.string().nullable(),
  areaCode: yup
    .string()
    .typeError("This field is required")
    .matches(/[0-9]+/gi, "Enter number only")
    .length(2, "must be 2 digits"),
  jpCode: yup
    .string()
    .typeError("This field is required")
    .matches(/[0-9]+/gi, "Enter number only")
    .length(4, "must be 4 digits"),
});
