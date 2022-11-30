import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  // jpCode: yup
  //   .string()
  //   .typeError("이 필드는 필수 항목입니다")
  //   .matches(/[0-9]+/gi, "숫자만 입력"),
  jpCode: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jpKg: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jpIndanga: yup.string().nullable(),
  jpOutdanga: yup.string().nullable(),
  jpIntong: yup.string().nullable(),
  jpOuttong: yup.string().nullable(),
  jpBaedal: yup.string().nullable(),
  jpSort: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jpKghigh: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jpName: yup.string().nullable(),
  jpBasictong: yup.string().nullable(),
  jpSpec: yup.string().nullable(),
  jpJaegoyn: yup.string().nullable(),
  jpCodeold: yup.string().nullable(),
  jpCodedt: yup.string().nullable(),
  jpUserid: yup.string().nullable(),
});
