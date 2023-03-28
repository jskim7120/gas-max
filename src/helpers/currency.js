import createNumberMask from "text-mask-addons/dist/createNumberMask";

const defaultMaskOptions = {
  prefix: "",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  // allowDecimal: true,
  // decimalSymbol: ".",
  // decimalLimit: 2, // how many digits allowed after the decimal
  // integerLimit: 7, // limit length of integer numbers
  allowNegative: true,
  // allowLeadingZeroes: true,
};

export const currencyMask = createNumberMask({
  ...defaultMaskOptions,
});

export function formatCurrencyRemoveComma(num) {
  num = parseFloat(String(num).replaceAll(",", ""));
  return num;
}

export function removeCommas(data, returnType) {
  const result =
    typeof data === "string"
      ? data.replace(/,/g, "")
      : String(data).replace(/,/g, "");

  if (returnType === "number") {
    return +result;
  }

  return result;
}

export function formatMoney(str) {
  const regex = /^\d+(.\d{1,2})?$/;
  if (!regex.test(str)) {
    return "";
  }
  const number = typeof str === "number" ? str : +str;
  const formattedNumber = number.toLocaleString({});
  return formattedNumber;
}
