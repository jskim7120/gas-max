import * as yup from "yup";

export const schema = yup.object({
  areaCode: yup.string().typeError("This field is required"),
  bpCode: yup
    .string()
    .typeError("This field is required")
    .matches(/[0-9]+/gi, "Enter number only")
    .length(3, "must be 3 digits"),
});
