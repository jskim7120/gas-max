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
  areaName: yup.string().nullable().max(20, "입력 초과"),
  jnSsno: yup.string().nullable().max(13, "입력 초과"),
  jnSangho: yup.string().nullable().max(26, "입력 초과"),
  jnSajang: yup.string().nullable().max(14, "입력 초과"),
  jnAddr1: yup.string().nullable().max(40, "입력 초과"),
  jnAddr2: yup.string().nullable().max(40, "입력 초과"),
  jnZipcode: yup.string().nullable().max(6, "입력 초과"),
  jnUptae: yup.string().nullable().max(50, "입력 초과"),
  jnJongmok: yup.string().nullable().max(50, "입력 초과"),
  jnTel1: yup.string().nullable().max(14, "입력 초과"),
  jnTel2: yup.string().nullable().max(14, "입력 초과"),
  jnFax: yup.string().nullable().max(14, "입력 초과"),
  jnAnname1: yup.string().nullable().max(10, "입력 초과"),
  jnAntel1: yup.string().nullable().max(14, "입력 초과"),
  jnAnname2: yup.string().nullable().max(10, "입력 초과"),
  jnAntel2: yup.string().nullable().max(14, "입력 초과"),
  jnJiroSNo: yup.string().nullable().max(6, "입력 초과"),
  jnJiroSNo02: yup.string().nullable().max(6, "입력 초과"),
  jnJiroSNo03: yup.string().nullable().max(6, "입력 초과"),
  jnJiroSNo04: yup.string().nullable().max(6, "입력 초과"),
  jnJirono: yup.string().nullable().max(7, "입력 초과"),
  jnJirono02: yup.string().nullable().max(7, "입력 초과"),
  jnJirono03: yup.string().nullable().max(7, "입력 초과"),
  jnJirono04: yup.string().nullable().max(7, "입력 초과"),
  jnJiroBigo: yup.string().nullable().max(7, "입력 초과"),
  jnJiroBigo02: yup.string().nullable().max(20, "입력 초과"),
  jnJiroBigo03: yup.string().nullable().max(20, "입력 초과"),
  jnJiroBigo04: yup.string().nullable().max(20, "입력 초과"),
  jnJiro: yup.string().nullable().max(3, "입력 초과"),
  jnJiro2: yup.string().nullable().max(3, "입력 초과"),
  jnJiro3: yup.string().nullable().max(3, "입력 초과"),
  jnJiro4: yup.string().nullable().max(3, "입력 초과"),
  jnBank1: yup.string().nullable().max(15, "입력 초과"),
  jnBank2: yup.string().nullable().max(15, "입력 초과"),
  jnBank3: yup.string().nullable().max(15, "입력 초과"),
  jnBank4: yup.string().nullable().max(15, "입력 초과"),
  jnBankNo1: yup.string().nullable().max(20, "입력 초과"),
  jnBankNo2: yup.string().nullable().max(20, "입력 초과"),
  jnBankNo3: yup.string().nullable().max(20, "입력 초과"),
  jnBankNo4: yup.string().nullable().max(20, "입력 초과"),
  jnMark1: yup.string().nullable().max(8, "입력 초과"),
  jnMark2: yup.string().nullable().max(8, "입력 초과"),
  jnMark3: yup.string().nullable().max(8, "입력 초과"),
  jnMark4: yup.string().nullable().max(8, "입력 초과"),
  jnMark5: yup.string().nullable().max(8, "입력 초과"),
});
