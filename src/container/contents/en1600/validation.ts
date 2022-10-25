import * as yup from "yup";

export const schema = yup.object({
  swCode: yup
    .string()
    .typeError("This field is required")
    .matches(/[0-9]+/gi, "Enter number only")
    .length(2, "must be 2 digits"),
  areaCode: yup
    .string()
    .typeError("This field is required")
    .matches(/[0-9]+/gi, "Enter number only")
    .length(2, "must be 2 digits"),
  areaName: yup.string().nullable().typeError("This field is required"),
  jnSsno: yup.string().nullable().max(13, "too long"),
  jnSangho: yup.string().nullable().max(26, "too long"),
  jnSajang: yup.string().nullable().max(14, "too long"),
  jnZipcode: yup.string().nullable().max(6, "too long"),
  jnAddr1: yup.string().nullable().max(40, "too long"),
  jnAddr2: yup.string().nullable().max(40, "too long"),
  jnUptae: yup.string().nullable().max(50, "too long"),
  jnJongmok: yup.string().nullable().max(50, "too long"),
  jnTel1: yup.string().nullable().max(14, "too long"),
  jnTel2: yup.string().nullable().max(14, "too long"),
  jnFax: yup.string().nullable().max(14, "too long"),
  jnAnName1: yup.string().nullable().max(10, "too long"),
  jnAnName2: yup.string().nullable().max(10, "too long"),
  jnAnTel1: yup.string().nullable().max(14, "too long"),
  jnAnTel2: yup.string().nullable().max(14, "too long"),
  jnSekum: yup.string().nullable().typeError("This field is required"),

  jnVatSumyn: yup.string().nullable(),
  jnSekumEa: yup.string().nullable(),
  jnJangbu: yup.string().nullable().typeError("This field is required"),
  jnCmngno: yup.string().nullable().max(4, "too long"),
  innopayBankYn: yup.string().nullable(),
  niceBankYn: yup.string().nullable(),
  jnJiroSNo: yup.string().nullable().max(6, "too long"),
  jnJiroSNo02: yup.string().nullable().max(6, "too long"),
  jnJiroSNo03: yup.string().nullable().max(6, "too long"),
  jnJiroSNo04: yup.string().nullable().max(6, "too long"),
  jnJiroNo: yup.string().nullable().max(7, "too long"),
  jnJiroNo02: yup.string().nullable().max(7, "too long"),
  jnJiroNo03: yup.string().nullable().max(7, "too long"),
  jnJiroNo04: yup.string().nullable().max(7, "too long"),
  jnJiroBigo: yup.string().nullable().max(20, "too long"),
  jnJiroBigo02: yup.string().nullable().max(20, "too long"),
  jnJiroBigo03: yup.string().nullable().max(20, "too long"),
  jnJiroBigo04: yup.string().nullable().max(20, "too long"),
  jnJiro: yup.string().nullable().max(3, "too long"),
  jnJiro2: yup.string().nullable().max(3, "too long"),
  jnJiro3: yup.string().nullable().max(3, "too long"),
  jnJiro4: yup.string().nullable().max(3, "too long"),
});
