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
  saupSsno: yup.string().nullable(),
  saupRCode: yup.string().nullable(),
  saupSangho: yup.string().nullable(),
  saupSajang: yup.string().nullable(),
  saupZipcode: yup.string().nullable(),
  saupAddr1: yup.string().nullable(),
  saupAddr2: yup.string().nullable(),
  saupUptae: yup.string().nullable(),
  saupJongmok: yup.string().nullable(),
  saupStamp: yup.string().nullable(),
  // saupStampSe: yup.string().nullable().max(1, "입력 초과"),
  // saupStampEs: yup.string().nullable().max(1, "입력 초과"),
  saupDate: yup.string().nullable(),
  saupJumin: yup.string().nullable(),
  saupBigo: yup.string().nullable(),
  saupEdiId: yup.string().nullable(),
  saupEdiPass: yup.string().nullable(),
  saupEdiSawon: yup.string().nullable(),
  saupEdiSmsNo: yup.string().nullable(),
  saupEdiEmail: yup.string().nullable(),
  saupCert: yup.string().nullable(),
});
