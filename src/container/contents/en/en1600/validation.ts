import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  swCode: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  swName: yup.string().nullable(),
  swJuminno: yup.string().nullable(),
  swTel: yup.string().nullable(),
  swHp: yup.string().nullable(),
  cuSeEmail: yup.string().nullable(),
  swZipcode: yup.string().nullable(),
  swAddr1: yup.string().nullable(),
  swAddr2: yup.string().nullable(),
  eyeSwCode: yup.string().nullable(),
  swStampFile: yup.string().nullable(),
  swIndate: yup.string().nullable(),
  swDriverNo: yup.string().nullable(),
  swDriverType: yup.string().nullable(),
  swJdate1: yup.string().nullable(),
  swJdate2: yup.string().nullable(),
  swBigo: yup.string().nullable(),
  // swWorkOut: yup.string().nullable().max(1, "입력 초과"),
  swOutDate: yup.string().nullable(),
  swPaykum: yup.string().nullable(),
});
