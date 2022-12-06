import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  jyCode: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jyName: yup.string().nullable(),
  jyBigo: yup.string().nullable(),
});
