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
  // allowNegative: false,
  // allowLeadingZeroes: true,
};

export const currencyMask = createNumberMask({
  ...defaultMaskOptions,
});

export function formatCurrencyRemoveComma(num) {
  num = parseFloat(String(num).replaceAll(",", ""));
  return num;
}
