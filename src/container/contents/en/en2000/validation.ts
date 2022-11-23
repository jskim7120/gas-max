import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  ccCode: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  ccName: yup.string().nullable().max(30, "입력 초과"),
  ccBigo: yup.string().nullable().max(50, "입력 초과"),
  // ccOilYn: yup.string().nullable().max(1, "입력 초과"),
});
