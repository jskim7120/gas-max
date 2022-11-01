import * as yup from "yup";

export const schema = yup.object({
  areaCode: yup.string(),
  jnAnkum: yup.number().typeError("숫자만 입력").nullable(true),
  jnPer: yup.number().typeError("숫자만 입력").nullable(true),
  jnKgdanga: yup.number().typeError("숫자만 입력").nullable(true),
  jnCost280: yup.number().typeError("숫자만 입력").nullable(true),
  jnCost600: yup.number().typeError("숫자만 입력").nullable(true),
  jnCost1000: yup.number().typeError("숫자만 입력").nullable(true),
  jnCost1500: yup.number().typeError("숫자만 입력").nullable(true),
  jnCost2000: yup.number().typeError("숫자만 입력").nullable(true),
  jnCost2500: yup.number().typeError("숫자만 입력").nullable(true),
  jnCost7000: yup.number().typeError("숫자만 입력").nullable(true),
});
