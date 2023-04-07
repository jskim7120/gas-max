import { removeCommas } from "helpers/currency";

export const calcFooterTab2Tab3 = (
  data65Detail: any,
  bcDc: any,
  bcOutkum: any,
  reset: any
) => {
  let sum = 0;
  data65Detail.forEach((item: any) => (sum += +item.bclAmt));

  const bcSupplyAmt = Math.round(sum / 1.1);
  const bcVatAmt = sum - bcSupplyAmt;
  const bcMisu =
    sum -
    (bcDc ? +removeCommas(bcDc, "number") : 0) -
    (bcOutkum ? +removeCommas(bcOutkum, "number") : 0);

  reset((formValues: any) => ({
    ...formValues,
    bcInkum: sum,
    bcInkum1: sum,
    bcSupplyAmt: bcSupplyAmt,
    bcVatAmt: bcVatAmt,
    bcMisu: bcMisu,
  }));
};
