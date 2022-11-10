import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  swCode: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  swName: yup
    .string()
    .required()
    .typeError("이 필드는 필수 항목입니다")
    .min(1)
    .max(12),
  swJuminno: yup.string().nullable().max(14, "too long"),
  swTel: yup.string().nullable().max(14, "too long"),
  swHp: yup.string().nullable().max(14, "too long"),
  cuSeEmail: yup.string().nullable().max(50, "too long"),
  swZipcode: yup.string().nullable().max(6, "too long"),
  swAddr1: yup.string().nullable().max(40, "too long"),
  swAddr2: yup.string().nullable().max(40, "too long"),
  eyeSwCode: yup.string().nullable().max(10, "too long"),
  swStampFile: yup.string().nullable().max(80, "too long"),
  swIndate: yup.string().nullable().max(8, "too long"),
  swDriverNo: yup.string().nullable().max(17, "too long"),
  swDriverType: yup.string().nullable().max(15, "too long"),
  swJdate1: yup.string().nullable().max(10, "too long"),
  swJdate2: yup.string().nullable().max(10, "too long"),
  swBigo: yup.string().nullable().max(40, "too long"),
  // swWorkOut: yup.string().nullable().max(1, "too long"),
  swOutDate: yup.string().nullable().max(10, "too long"),
  swPaykum: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true)
    .max(18),
});
