import * as yup from "yup";

export const schema = yup.object({
  swCode: yup
    .number()
    .typeError("too bh yostoi")
    .nullable(true)
    .transform((_, val) => (val === val ? Number(val) : null)),
  swName: yup.string().nullable(true).required("zaaval bh talbar"),
  swGubun: yup.string().nullable(true),
  swPaykum: yup
    .number()
    .typeError("too bh yostoi")
    .nullable(true)
    .transform((_, val) => (val === val ? Number(val) : null)),
  opt: yup
    .number()
    .typeError("too bh yostoi")
    .nullable(true)
    .transform((_, val) => (val === val ? Number(val) : null)),
  swTel: yup
    .number()
    .typeError("too bh yostoi")
    .nullable(true)
    .transform((_, val) => (val === val ? Number(val) : null)),
});
