import matchers from "@testing-library/jest-dom/matchers";
import * as yup from "yup";

export const schema = yup.object({
  areaCode: yup.string(),
  bpCode: yup
    .string()
    .typeError("이 필드는 필수 항목입니다")
    .matches(/[0-9]+/gi, "숫자만 입력")
    .length(3, "3자리 숫자만  입력"),
  bpIndanga: yup.number().typeError("숫자만 입력").nullable(true),
  bpOutdanga: yup.number().typeError("숫자만 입력").nullable(true),
});
