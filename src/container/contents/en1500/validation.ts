import * as yup from "yup";

export const schema = yup.object({
  // sw: yup
  //   .number()
  //   .typeError("too bh yostoi")
  //   .nullable(true)
  //   .transform((_, val) => (val === val ? Number(val) : null)),
  // swName: yup.string().nullable(true).required("zaaval bh talbar"),
  // swGubun: yup.string().nullable(true),
  // swPaykum: yup
  //   .number()
  //   .typeError("too bh yostoi")
  //   .nullable(true)
  //   .transform((_, val) => (val === val ? Number(val) : null)),
  // opt: yup
  //   .number()
  //   .typeError("too bh yostoi")
  //   .nullable(true)
  //   .transform((_, val) => (val === val ? Number(val) : null)),
  // swTel: yup
  //   .number()
  //   .typeError("too bh yostoi")
  //   .nullable(true)
  //   .transform((_, val) => (val === val ? Number(val) : null)),
  areaCode: yup
    .string()
    .typeError("This field is required")
    .matches(/[0-9]+/gi, "Enter number only")
    .length(2, "must be 2 digits"),
  areaName: yup.string().required("zaaval bh"),
});
