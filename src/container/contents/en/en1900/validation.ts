import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  gubunCode: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  gubunName: yup.string().nullable(),
  gubunBigo: yup.string().nullable(),
});
