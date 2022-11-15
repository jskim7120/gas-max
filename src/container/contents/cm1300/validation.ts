import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  areaCode: yup.string().nullable(),
  aptCode: yup.string().nullable(),
  aptName: yup.string().nullable(),
  aptTypeName: yup.string().nullable(),
  swName: yup.string().nullable(),
  aptType: yup.string().nullable(),
  aptZipcode: yup.string().nullable(),
  aptAddr1: yup.string().nullable(),
  aptAddr2: yup.string().nullable(),
  apt4ho: yup.string().nullable(),
  apt4f: yup.string().nullable(),
  aptBf: yup.string().nullable(),
  aptSwCode: yup.string().nullable(),
  aptJyCode: yup.string().nullable(),
  aptCustgubun: yup.string().nullable(),
  aptRh2o: yup.string().nullable(),
  aptRdangaType: yup.string().nullable(),
  aptAnkum: yup.string().nullable(),
  aptSisulkum: yup.string().nullable(),
  aptRdangaSign: yup.string().nullable(),
  aptMeterkum: yup.string().nullable(),
  aptPer: yup.string().nullable(),
  aptGumdate: yup.string().nullable(),
  aptSukumtype: yup.string().nullable(),
  aptF: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  aptS: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  aptSum: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
});
