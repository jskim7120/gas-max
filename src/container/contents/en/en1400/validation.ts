import matchers from "@testing-library/jest-dom/matchers";
import * as yup from "yup";

const reg = /^\d+$/;
export const schema = yup.object({
  bpCode: yup
    .number()
    .typeError("숫자만 입력")
    .transform((_, val) => {
      return val !== "" ? (reg.test(val) ? parseInt(val) : "string") : 0;
    })
    .nullable(true),
  bpName: yup.string().nullable().max(20, "입력 초과"),
  bpType: yup.string().nullable().max(10, "입력 초과"),
  bpDanwi: yup.string().nullable().max(10, "입력 초과"),
  bpIndanga: yup.string().nullable(),
  bpOutdanga: yup.string().nullable(),
});
