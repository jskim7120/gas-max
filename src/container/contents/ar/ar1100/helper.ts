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

export const calculationOfVat2 = (price: number, vatDivVal: string) => {
  let tempKumSup: number = 0;
  let tempKumVat: number = 0;

  if (vatDivVal === "0" || vatDivVal === "1") {
    tempKumSup = Math.round(price / 1.1);
    tempKumVat = price - tempKumSup;
  } else if (vatDivVal === "2") {
    tempKumSup = price;
    tempKumVat = 0;
  }
  return {
    tempKumSup,
    tempKumVat,
  };
};

export const timeData = [
  {
    code: "0900",
    codeName: "09:00",
  },
  {
    code: "1000",
    codeName: "10:00",
  },
  {
    code: "1100",
    codeName: "11:00",
  },
  {
    code: "1200",
    codeName: "12:00",
  },
  {
    code: "1300",
    codeName: "13:00",
  },
  {
    code: "1400",
    codeName: "14:00",
  },
  {
    code: "1500",
    codeName: "15:00",
  },
  {
    code: "1600",
    codeName: "16:00",
  },
  {
    code: "1700",
    codeName: "17:00",
  },
  {
    code: "1800",
    codeName: "18:00",
  },
];
