import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  swCode: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  swName: yup.string().required().typeError("이 필드는 필수 항목입니다"),
  swJuminno: yup.string().nullable().max(14, "입력 초과"),
  swTel: yup.string().nullable().max(14, "입력 초과"),
  swHp: yup.string().nullable().max(14, "입력 초과"),
  cuSeEmail: yup.string().nullable().max(50, "입력 초과"),
  swZipcode: yup.string().nullable().max(6, "입력 초과"),
  swAddr1: yup.string().nullable().max(40, "입력 초과"),
  swAddr2: yup.string().nullable().max(40, "입력 초과"),
  eyeSwCode: yup.string().nullable().max(10, "입력 초과"),
  swStampFile: yup.string().nullable().max(80, "입력 초과"),
  swIndate: yup.string().nullable().max(10, "입력 초과"),
  swDriverNo: yup.string().nullable().max(17, "입력 초과"),
  swDriverType: yup.string().nullable().max(15, "입력 초과"),
  swJdate1: yup.string().nullable().max(10, "입력 초과"),
  swJdate2: yup.string().nullable().max(10, "입력 초과"),
  swBigo: yup.string().nullable().max(40, "입력 초과"),
  // swWorkOut: yup.string().nullable().max(1, "입력 초과"),
  swOutDate: yup.string().nullable().max(10, "입력 초과"),
  swPaykum: yup.string().nullable(),
});
