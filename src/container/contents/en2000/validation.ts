import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  ccCode: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  ccName: yup.string().nullable().max(30, "too long"),
  ccBigo: yup.string().nullable().max(50, "too long"),
  // ccOilYn: yup.string().nullable().max(1, "too long"),
});
