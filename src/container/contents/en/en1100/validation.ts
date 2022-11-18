import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  areaCode: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  areaName: yup.string().nullable().max(20, "too long"),
  jnSsno: yup.string().nullable().max(13, "too long"),
  jnSangho: yup.string().nullable().max(26, "too long"),
  jnSajang: yup.string().nullable().max(14, "too long"),
  jnAddr1: yup.string().nullable().max(40, "too long"),
  jnAddr2: yup.string().nullable().max(40, "too long"),
  jnZipcode: yup.string().nullable().max(6, "too long"),
  jnUptae: yup.string().nullable().max(50, "too long"),
  jnJongmok: yup.string().nullable().max(50, "too long"),
  jnTel1: yup.string().nullable().max(14, "too long"),
  jnTel2: yup.string().nullable().max(14, "too long"),
  jnFax: yup.string().nullable().max(14, "too long"),
  jnAnname1: yup.string().nullable().max(10, "too long"),
  jnAntel1: yup.string().nullable().max(14, "too long"),
  jnAnname2: yup.string().nullable().max(10, "too long"),
  jnAntel2: yup.string().nullable().max(14, "too long"),
  jnJiroSNo: yup.string().nullable().max(6, "too long"),
  jnJiroSNo02: yup.string().nullable().max(6, "too long"),
  jnJiroSNo03: yup.string().nullable().max(6, "too long"),
  jnJiroSNo04: yup.string().nullable().max(6, "too long"),
  jnJirono: yup.string().nullable().max(7, "too long"),
  jnJirono02: yup.string().nullable().max(7, "too long"),
  jnJirono03: yup.string().nullable().max(7, "too long"),
  jnJirono04: yup.string().nullable().max(7, "too long"),
  jnJiroBigo: yup.string().nullable().max(7, "too long"),
  jnJiroBigo02: yup.string().nullable().max(20, "too long"),
  jnJiroBigo03: yup.string().nullable().max(20, "too long"),
  jnJiroBigo04: yup.string().nullable().max(20, "too long"),
  jnJiro: yup.string().nullable().max(3, "too long"),
  jnJiro2: yup.string().nullable().max(3, "too long"),
  jnJiro3: yup.string().nullable().max(3, "too long"),
  jnJiro4: yup.string().nullable().max(3, "too long"),
  jnBank1: yup.string().nullable().max(15, "too long"),
  jnBank2: yup.string().nullable().max(15, "too long"),
  jnBank3: yup.string().nullable().max(15, "too long"),
  jnBank4: yup.string().nullable().max(15, "too long"),
  jnBankNo1: yup.string().nullable().max(20, "too long"),
  jnBankNo2: yup.string().nullable().max(20, "too long"),
  jnBankNo3: yup.string().nullable().max(20, "too long"),
  jnBankNo4: yup.string().nullable().max(20, "too long"),
  jnMark1: yup.string().nullable().max(8, "too long"),
  jnMark2: yup.string().nullable().max(8, "too long"),
  jnMark3: yup.string().nullable().max(8, "too long"),
  jnMark4: yup.string().nullable().max(8, "too long"),
  jnMark5: yup.string().nullable().max(8, "too long"),
});
