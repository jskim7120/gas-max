import * as yup from "yup";

export const schema = yup.object({
  areaCode: yup.string(),
  saupSno: yup
    .string()
    .matches(/[0-9]+/gi, "숫자만 입력")
    .length(2, "2자리 숫자만  입력"),
});
