import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  gubunCode: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  gubunName: yup.string().nullable().max(20, "too long"),
  gubunBigo: yup.string().nullable().max(20, "too long"),
});
