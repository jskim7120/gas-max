import { removeCommas } from "helpers/currency";

export const calcTab1GridChange = (
  data65Detail: any,
  getValues: any,
  data65: any,
  reset: any,
  bcPjan: any,
  bcBjan: any,
  bcPdanga: any,
  bcBdanga: any,
  bcPcost: any,
  bcBcost: any,
  bcGcost: any,
  bcOutkum: any,
  bcDc: any
) => {
  if (data65Detail) {
    let bcPin: number = 0;
    let bcBin: number = 0;
    let bcSumP: number = 0;
    let bcSumB: number = 0;
    let bcPkum: number = 0;
    let bcBkum: number = 0;
    let bcPsum: number = 0;
    let bcBsum: number = 0;

    let bcTotal: number = 0;
    let bcJTotal: number = 0;
    let bcSumTotal: number = 0;
    let bcSumKum: number = 0;
    let bcSumCost: number = 0;
    let bcSum: number = 0;

    data65Detail.forEach((obj: any) => {
      if (obj.bclGubun === "0") {
        bcPin += (obj.bclInqty ?? 0) * obj.bclKg;
        if (obj.bclSvyn === "N") {
          bcSumP += (obj.bclInqty ?? 0) * obj.bclKg;
        }
      }

      if (obj.bclGubun === "1") {
        bcBin += (obj.bclInqty ?? 0) * obj.bclKg;

        if (obj.bclSvyn === "N") {
          bcSumB += (obj.bclInqty ?? 0) * obj.bclKg;
        }
      }
    });

    bcSumP = bcSumP - (bcPjan ? +removeCommas(bcPjan, "number") : 0);
    bcSumB = bcSumB - (bcBjan ? +removeCommas(bcBjan, "number") : 0);
    bcPkum = bcSumP * (bcPdanga ? +removeCommas(bcPdanga, "number") : 0);
    bcBkum = bcSumB * (bcBdanga ? +removeCommas(bcBdanga, "number") : 0);
    bcPsum = bcPkum + (bcPcost ? +removeCommas(bcPcost, "number") : 0);
    bcBsum = bcBkum + (bcBcost ? +removeCommas(bcBcost, "number") : 0);

    bcTotal =
      (isNaN(bcPin) ? 0 : +bcPin) +
      (isNaN(bcBin) ? 0 : +bcBin) +
      +data65?.bcGin;
    bcJTotal =
      (bcPjan ? +removeCommas(bcPjan, "number") : 0) +
      (bcBjan ? +removeCommas(bcBjan, "number") : 0);
    bcSumTotal = bcSumP + +bcSumB;
    bcSumKum = bcPkum + +bcBkum + +data65?.bcGkum;
    bcSumCost =
      (bcPcost ? +removeCommas(bcPcost, "number") : 0) +
      (bcBcost ? +removeCommas(bcBcost, "number") : 0) +
      (bcGcost ? +removeCommas(bcGcost, "number") : 0);
    bcSum = bcPsum + +bcBsum + +data65?.bcGsum;

    const bcSupplyAmt = Math.round(bcSum / 1.1);
    const bcVatAmt = bcSum - bcSupplyAmt;
    const bcMisu =
      bcSum -
      (bcDc ? +removeCommas(bcDc, "number") : 0) -
      (bcOutkum ? +removeCommas(bcOutkum, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcPin: bcPin,
      bcBin: bcBin,
      bcSumP: bcSumP,
      bcSumB: bcSumB,
      bcPkum: bcPkum,
      bcBkum: bcBkum,
      bcPsum: bcPsum,
      bcBsum: bcBsum,
      bcTotal: bcTotal,
      bcJTotal: bcJTotal,
      bcSumTotal: bcSumTotal,
      bcSumKum: bcSumKum,
      bcSumCost: bcSumCost,
      bcSum: bcSum,
      bcInkum: bcSum,
      bcInkum1: bcSum,
      bcSupplyAmt: bcSupplyAmt,
      bcVatAmt: bcVatAmt,
      bcMisu: bcMisu,
    }));
  }
};

export const calcFooterTab2Tab3 = (
  data65Detail: any,
  getValues: any,
  reset: any
) => {
  let sum = 0;
  data65Detail.forEach((item: any) => (sum += +item.bclAmt));
  const { bcDc, bcOutkum } = getValues();

  const bcSupplyAmt = Math.round(sum / 1.1);
  const bcVatAmt = sum - bcSupplyAmt;
  const bcMisu = sum - +bcDc - +bcOutkum;

  reset((formValues: any) => ({
    ...formValues,
    bcInkum: sum,
    bcInkum1: sum,
    bcSupplyAmt: bcSupplyAmt,
    bcVatAmt: bcVatAmt,
    bcMisu: bcMisu,
  }));
};
