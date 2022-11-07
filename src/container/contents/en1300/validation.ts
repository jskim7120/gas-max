import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  areaCode: yup.string(),
  jpCode: yup
    .string()
    .matches(/[0-9]+/gi, "숫자만 입력")
    .length(4, "4자리 숫자만  입력"),
  // jpKg: yup
  //   .number()
  //   .typeError("숫자만 입력")
  //   .transform((_, val) => {
  //     return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
  //   })
  //   .nullable(true),
  // jpIndanga: yup
  //   .number()
  //   .typeError("숫자만 입력")
  //   .transform((_, val) => {
  //     return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
  //   })
  //   .nullable(true),
  // jpOutdanga: yup
  //   .number()
  //   .typeError("숫자만 입력")
  //   .transform((_, val) => {
  //     return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
  //   })
  //   .nullable(true),
  // jpIntong: yup
  //   .number()
  //   .typeError("숫자만 입력")
  //   .transform((_, val) => {
  //     return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
  //   })
  //   .nullable(true),
  // jpOuttong: yup
  //   .number()
  //   .typeError("숫자만 입력")
  //   .transform((_, val) => {
  //     return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
  //   })
  //   .nullable(true),
  // jpBaedal: yup
  //   .number()
  //   .typeError("숫자만 입력")
  //   .transform((_, val) => {
  //     return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
  //   })
  //   .nullable(true),
  // jpSort: yup
  //   .number()
  //   .typeError("숫자만 입력")
  //   .transform((_, val) => {
  //     return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
  //   })
  //   .nullable(true),
  // jpKghigh: yup
  //   .number()
  //   .typeError("숫자만 입력")
  //   .transform((_, val) => {
  //     return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
  //   })
  //   .nullable(true),
  jpName: yup.string().nullable().max(40, "too long"),
  jpBasictong: yup.string().nullable().max(1, "too long"),
  jpSpec: yup.string().nullable().max(20, "too long"),
  jpJaegoyn: yup.string().nullable().max(1, "too long"),
  jpCodeold: yup.string().nullable().max(8, "too long"),
  jpCodedt: yup.string().nullable().max(16, "too long"),
  jpUserid: yup.string().nullable().max(30, "too long"),
});
