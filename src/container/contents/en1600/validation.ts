import * as yup from "yup";

export const schema = yup.object({
  swCode: yup
    .string()
    .typeError("이 필드는 필수 항목입니다")
    .matches(/[0-9]+/gi, "숫자만 입력")
    .length(2, "3자리 숫자만  입력"),
  areaCode: yup.string(),
  swPaykum: yup.number().nullable(true).typeError("숫자만 입력"),
});
