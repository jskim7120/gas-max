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
  saupSsno: yup.string().nullable().max(12, "too long"),
  saupRCode: yup.string().nullable().max(4, "too long"),
  saupSangho: yup.string().nullable().max(50, "too long"),
  saupSajang: yup.string().nullable().max(20, "too long"),
  saupZipcode: yup.string().nullable().max(6, "too long"),
  saupAddr1: yup.string().nullable().max(40, "too long"),
  saupAddr2: yup.string().nullable().max(40, "too long"),
  saupUptae: yup.string().nullable().max(50, "too long"),
  saupJongmok: yup.string().nullable().max(50, "too long"),
  saupStamp: yup.string().nullable().max(150, "too long"),
  // saupStampSe: yup.string().nullable().max(1, "too long"),
  // saupStampEs: yup.string().nullable().max(1, "too long"),
  saupDate: yup.string().nullable().max(10, "too long"),
  saupJumin: yup.string().nullable().max(13, "too long"),
  saupBigo: yup.string().nullable().max(50, "too long"),
  saupEdiId: yup.string().nullable().max(20, "too long"),
  saupEdiPass: yup.string().nullable().max(20, "too long"),
  saupEdiSawon: yup.string().nullable().max(14, "too long"),
  saupEdiSmsNo: yup.string().nullable().max(14, "too long"),
  saupEdiEmail: yup.string().nullable().max(35, "too long"),
  saupCert: yup.string().nullable().max(200, "too long"),
});
