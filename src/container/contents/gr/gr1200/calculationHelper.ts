import React from "react";

// -----------------------------------------------------------------------------------------------------------------
export const calcTab1GridChange = (
  data65Detail: any,
  //setBin: any,
  //setPin: any,
  setSumB: any,
  setSumP: any,
  getValues: any,
  data65: any,
  reset: any
) => {
  if (data65Detail) {
    let bcPin = 0;
    let bcBin = 0;
    let bcSumP = 0;
    let bcSumB = 0;
    let bcPkum = 0;
    let bcBkum = 0;
    let bcPsum = 0;
    let bcBsum = 0;

    let bcTotal = 0;
    let bcJTotal = 0;
    let bcSumTotal = 0;
    let bcSumKum = 0;
    let bcSumCost = 0;
    let bcSum = 0;

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

    //setPin(bcPin);
    //setBin(bcBin);
    setSumP(bcSumP);
    setSumB(bcSumB);

    const { bcPjan, bcBjan, bcPdanga, bcBdanga, bcPcost, bcBcost } =
      getValues();

    if (bcPjan) {
      bcSumP -= bcPjan;
    }
    if (bcBjan) {
      bcSumB -= bcBjan;
    }
    if (bcPdanga) {
      bcPkum = bcSumP * bcPdanga;
    }
    if (bcBdanga) {
      bcBkum = bcSumB * bcBdanga;
    }

    if (bcPcost) {
      bcPsum = bcPkum + +bcPcost;
    } else {
      bcPsum = bcPkum;
    }

    if (bcBcost) {
      bcBsum = bcBkum + +bcBcost;
    } else {
      bcBsum = bcBkum;
    }

    bcTotal =
      (isNaN(bcPin) ? 0 : +bcPin) +
      (isNaN(bcBin) ? 0 : +bcBin) +
      +data65?.bcGin;
    bcJTotal = +bcPjan + +bcBjan;
    bcSumTotal = bcSumP + +bcSumB;
    bcSumKum = bcPkum + +bcBkum + +data65?.bcGkum;
    bcSumCost = +bcPcost + +bcBcost + +data65?.bcGcost;
    bcSum = bcPsum + +bcBsum + +data65?.bcGsum;

    const bcSupplyAmt = Math.round(bcSum / 1.1);
    const bcVatAmt = bcSum - bcSupplyAmt;
    reset((formValues: any) => ({
      ...formValues,
      bcPin: isNaN(bcPin) ? 0 : bcPin,
      bcBin: isNaN(bcBin) ? 0 : bcBin,
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
      bcSupplyAmt: bcSupplyAmt,
      bcVatAmt: bcVatAmt,
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
