import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  saupSno: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  saupSsno: yup.string().nullable().max(12, "입력 초과"),
  saupRCode: yup.string().nullable().max(4, "입력 초과"),
  saupSangho: yup.string().nullable().max(50, "입력 초과"),
  saupSajang: yup.string().nullable().max(20, "입력 초과"),
  saupZipcode: yup.string().nullable().max(6, "입력 초과"),
  saupAddr1: yup.string().nullable().max(40, "입력 초과"),
  saupAddr2: yup.string().nullable().max(40, "입력 초과"),
  saupUptae: yup.string().nullable().max(50, "입력 초과"),
  saupJongmok: yup.string().nullable().max(50, "입력 초과"),
  saupStamp: yup.string().nullable().max(150, "입력 초과"),
  // saupStampSe: yup.string().nullable().max(1, "입력 초과"),
  // saupStampEs: yup.string().nullable().max(1, "입력 초과"),
  saupDate: yup.string().nullable().max(10, "입력 초과"),
  saupJumin: yup.string().nullable().max(14, "입력 초과"),
  saupBigo: yup.string().nullable().max(50, "입력 초과"),
  saupEdiId: yup.string().nullable().max(20, "입력 초과"),
  saupEdiPass: yup.string().nullable().max(20, "입력 초과"),
  saupEdiSawon: yup.string().nullable().max(14, "입력 초과"),
  saupEdiSmsNo: yup.string().nullable().max(14, "입력 초과"),
  saupEdiEmail: yup.string().nullable().max(35, "입력 초과"),
  saupCert: yup.string().nullable().max(200, "입력 초과"),
});
