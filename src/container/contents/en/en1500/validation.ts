import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  areaCode: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  areaName: yup.string().nullable(),
  jnAnkum: yup.string().nullable(),
  jnPer: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jnKgdanga: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jnCost280: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jnCost600: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jnCost1000: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jnCost1500: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jnCost2000: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jnCost2500: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  jnCost7000: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
});
