import * as yup from "yup";

export const schema = yup.object({
  saupSno: yup
    .string()
    .typeError("This field is required")
    .matches(/[0-9]+/gi, "Enter number only")
    .length(2, "must be 2 digits"),
});
