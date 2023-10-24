import { removeCommas } from "helpers/currency";

export const prepVal = (val: number) => {
  let tempVal = val ? +removeCommas(val, "number") : 0;
  return isNaN(tempVal) ? 0 : tempVal;
};

export const calculationOfVat = (price: number, vatDivVal: string) => {
  let tempKumSup: number = 0;
  let tempKumVat: number = 0;
  let tempTotal: number = 0;

  if (vatDivVal === "0") {
    tempKumSup = Math.round(price / 1.1);
    tempKumVat = price - tempKumSup;
    tempTotal = price;
  } else if (vatDivVal === "1") {
    tempKumSup = price;
    tempKumVat = Math.round(price * 0.1);
    tempTotal = tempKumSup + tempKumVat;
  } else if (vatDivVal === "2") {
    tempKumSup = price;
    tempKumVat = 0;
    tempTotal = price;
  }
  return {
    tempKumSup,
    tempKumVat,
    tempTotal,
  };
};
