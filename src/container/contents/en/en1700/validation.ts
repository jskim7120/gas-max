import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  caCode: yup
    .number()
    .typeError("")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  caName: yup.string().nullable(),
  eyeCarCode: yup.string().nullable(),
  caSafeDate: yup.string().nullable(),
  caChargeDate: yup.string().nullable(),
  caType: yup.string().nullable(),
  caYear: yup.string().nullable(),
  caManager: yup.string().nullable(),
  caInDate: yup.string().nullable(),
  // caRentYn: yup.string().nullable().max(1, "입력 초과"),
  caRentDate: yup.string().nullable(),
  caJdate1: yup.string().nullable(),
  caJdate2: yup.string().nullable(),
  caBigo: yup.string().nullable(),
  caBco: yup.string().nullable(),
  caBjijum: yup.string().nullable(),
  caBdamdang: yup.string().nullable(),
  caBtel: yup.string().nullable(),
  caBhp: yup.string().nullable(),
  caBman: yup.string().nullable(),
  caBno: yup.string().nullable(),
  caBsdate: yup.string().nullable(),
  caBldate: yup.string().nullable(),
  caInsuranceAmt: yup.string().nullable(),
  // caBage: yup.string().nullable().max(1, "입력 초과"),
});
