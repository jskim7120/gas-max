import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  jyCode: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jyName: yup.string().nullable().max(4, "입력 초과"),
  jyBigo: yup.string().nullable().max(4, "입력 초과"),
});
