import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  caCode: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  caName: yup.string().nullable().max(15, "입력 초과"),
  eyeCarCode: yup.string().nullable().max(10, "입력 초과"),
  caSafeDate: yup.string().nullable().max(10, "입력 초과"),
  caChargeDate: yup.string().nullable().max(8, "입력 초과"),
  caType: yup.string().nullable().max(20, "입력 초과"),
  caYear: yup.string().nullable().max(6, "입력 초과"),
  caManager: yup.string().nullable().max(20, "입력 초과"),
  caInDate: yup.string().nullable().max(10, "입력 초과"),
  // caRentYn: yup.string().nullable().max(1, "입력 초과"),
  caRentDate: yup.string().nullable().max(10, "입력 초과"),
  caJdate1: yup.string().nullable().max(10, "입력 초과"),
  caJdate2: yup.string().nullable().max(10, "입력 초과"),
  caBigo: yup.string().nullable().max(40, "입력 초과"),
  caBco: yup.string().nullable().max(20, "입력 초과"),
  caBjijum: yup.string().nullable().max(20, "입력 초과"),
  caBdamdang: yup.string().nullable().max(10, "입력 초과"),
  caBtel: yup.string().nullable().max(14, "입력 초과"),
  caBhp: yup.string().nullable().max(14, "입력 초과"),
  caBman: yup.string().nullable().max(10, "입력 초과"),
  caBno: yup.string().nullable().max(20, "입력 초과"),
  caBsdate: yup.string().nullable().max(10, "입력 초과"),
  caBldate: yup.string().nullable().max(10, "입력 초과"),
  caInsuranceAmt: yup.string().nullable(),
  // caBage: yup.string().nullable().max(1, "입력 초과"),
});
