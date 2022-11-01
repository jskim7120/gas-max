import * as yup from "yup";

export const schema = yup.object({
  areaCode: yup.string(),
  jpCode: yup.string().matches(/[0-9]+/gi, "숫자만 입력"),
  jpKg: yup.number().nullable(true).typeError("숫자만 입력"),
  jpIndanga: yup.number().nullable(true).typeError("숫자만 입력"),
  jpOutdanga: yup.number().nullable(true).typeError("숫자만 입력"),
  jpIntong: yup.number().nullable(true).typeError("숫자만 입력"),
  jpOuttong: yup.number().nullable(true).typeError("숫자만 입력"),
  jpBaedal: yup.number().nullable(true).typeError("숫자만 입력"),
  jpSort: yup.number().nullable(true).typeError("숫자만 입력"),
  jpKghigh: yup.number().nullable(true).typeError("숫자만 입력"),
});
