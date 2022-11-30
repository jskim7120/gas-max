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
  areaName: yup.string().nullable(),
  jnSsno: yup.string().nullable(),
  jnSangho: yup.string().nullable(),
  jnSajang: yup.string().nullable(),
  jnAddr1: yup.string().nullable(),
  jnAddr2: yup.string().nullable(),
  jnZipcode: yup.string().nullable(),
  jnUptae: yup.string().nullable(),
  jnJongmok: yup.string().nullable(),
  jnTel1: yup.string().nullable(),
  jnTel2: yup.string().nullable(),
  jnFax: yup.string().nullable(),
  jnAnname1: yup.string().nullable(),
  jnAntel1: yup.string().nullable(),
  jnAnname2: yup.string().nullable(),
  jnAntel2: yup.string().nullable(),
  jnJiroSNo: yup.string(),
  jnJiroSNo02: yup.string().nullable(),
  jnJiroSNo03: yup.string().nullable(),
  jnJiroSNo04: yup.string().nullable(),
  jnJirono: yup.string().nullable(),
  jnJirono02: yup.string().nullable(),
  jnJirono03: yup.string().nullable(),
  jnJirono04: yup.string().nullable(),
  jnJiroBigo: yup.string().nullable(),
  jnJiroBigo02: yup.string().nullable(),
  jnJiroBigo03: yup.string().nullable(),
  jnJiroBigo04: yup.string().nullable(),
  jnBank1: yup.string().nullable(),
  jnBank2: yup.string().nullable(),
  jnBank3: yup.string().nullable(),
  jnBank4: yup.string().nullable(),
  jnBankNo1: yup.string().nullable(),
  jnBankNo2: yup.string().nullable(),
  jnBankNo3: yup.string().nullable(),
  jnBankNo4: yup.string().nullable(),
  jnMark1: yup.string().nullable(),
  jnMark2: yup.string().nullable(),
  jnMark3: yup.string().nullable(),
  jnMark4: yup.string().nullable(),
  jnMark5: yup.string().nullable(),
});
