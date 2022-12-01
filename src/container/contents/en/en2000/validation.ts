import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  ccCode: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  ccName: yup.string().nullable(),
  ccBigo: yup.string().nullable(),
  // ccOilYn: yup.string().nullable().max(1, "입력 초과"),
});
