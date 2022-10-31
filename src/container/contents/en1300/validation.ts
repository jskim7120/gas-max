import * as yup from "yup";

export const schema = yup.object({
  areaCode: yup
    .string()
    .typeError("This field is required")
    .matches(/[0-9]+/gi, "Enter number only")
    .length(2, "must be 2 digits"),
  jpCode: yup
    .string()
    .typeError("This field is required")
    .matches(/[0-9]+/gi, "Enter number only")
    .length(2, "must be 4 digits"),
  jpName: yup.string().nullable().max(40, "too long"),
  jpGubun: yup.string().nullable().max(1, "too long"),
  jpKg: yup.number().required("zaaval bh"),
  jpIndanga: yup.number().required("zaaval bh"),
  jpOutdanga: yup.number().required("zaaval bh"),
  jpIntong: yup.number().required("zaaval bh"),
  jpOuttong: yup.number().required("zaaval bh"),
  jpBaedal: yup.number().required("zaaval bh"),
  jpBasictong: yup.string().nullable().max(1, "too long"),
  jpUnit: yup.string().nullable().max(10, "too long"),
  jpSort: yup.number().required("zaaval bh"),
  jpSpec: yup.string().nullable().max(20, "too long"),
  jpKind: yup.string().nullable().max(1, "too long"),
  jpJaegoyn: yup.string().nullable().max(1, "too long"),
  jpGastype: yup.string().nullable().max(1, "too long"),
  jpKgdanwi: yup.string().nullable().max(6, "too long"),
  jpKghigh: yup.number().required("zaaval bh"),
  jpCodeold: yup.string().nullable().max(8, "too long"),
  jpCodedt: yup.string().nullable().max(16, "too long"),
  jpUserid: yup.string().nullable().max(30, "too long"),
  jpGasuse: yup.string().nullable().max(20, "too long"),
});
