import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  caCode: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  caName: yup.string().nullable().max(15, "too long"),
  eyeCarCode: yup.string().nullable().max(10, "too long"),
  caSafeDate: yup.string().nullable().max(10, "too long"),
  caChargeDate: yup.string().nullable().max(8, "too long"),
  caType: yup.string().nullable().max(20, "too long"),
  caYear: yup.string().nullable().max(6, "too long"),
  caManager: yup.string().nullable().max(20, "too long"),
  caInDate: yup.string().nullable().max(10, "too long"),
  // caRentYn: yup.string().nullable().max(1, "too long"),
  caRentDate: yup.string().nullable().max(10, "too long"),
  caJdate1: yup.string().nullable().max(10, "too long"),
  caJdate2: yup.string().nullable().max(10, "too long"),
  caBigo: yup.string().nullable().max(40, "too long"),
  caBco: yup.string().nullable().max(20, "too long"),
  caBjijum: yup.string().nullable().max(20, "too long"),
  caBdamdang: yup.string().nullable().max(10, "too long"),
  caBtel: yup.string().nullable().max(14, "too long"),
  caBhp: yup.string().nullable().max(14, "too long"),
  caBman: yup.string().nullable().max(10, "too long"),
  caBno: yup.string().nullable().max(20, "too long"),
  caBsdate: yup.string().nullable().max(10, "too long"),
  caBldate: yup.string().nullable().max(10, "too long"),
  caInsuranceAmt: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val != "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true)
    .max(10),
  // caBage: yup.string().nullable().max(1, "too long"),
});
