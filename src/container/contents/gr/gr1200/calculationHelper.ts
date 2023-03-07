import React from "react";

export const calcTab1FooterChange = (
  num: any,
  name: string,
  getValues: any,
  reset: any,
  data65: any,
  sumP: any,
  sumB: any
) => {
  if (name === "bcPjan") {
    const { bcPdanga, bcPcost, bcBjan, bcSumB, bcBkum, bcBsum } = getValues();
    let bcSumP: number = 0;
    let bcPkum: number = 0;
    let bcPsum: number = 0;
    let bcJTotal: number = 0;
    let bcSumTotal: number = 0;
    let bcSumKum: number = 0;
    let bcSum: number = 0;

    bcSumP = sumP - parseInt(num === "" ? 0 : num);

    if (bcPdanga) {
      bcPkum = bcSumP * bcPdanga;
    }

    if (bcPcost) {
      bcPsum = bcPkum + +bcPcost;
    } else {
      bcPsum = bcPkum;
    }

    bcJTotal = parseInt(num === "" ? 0 : num) + +bcBjan;
    bcSumTotal = bcSumP + +bcSumB;
    bcSumKum = bcPkum + +bcBkum;
    bcSum = bcPsum + bcBsum;

    reset((formValues: any) => ({
      ...formValues,
      bcSumP: bcSumP,
      bcPkum: bcPkum,
      bcPsum: bcPsum,
      bcJTotal: bcJTotal,
      bcSumTotal: bcSumTotal,
      bcSumKum: bcSumKum,
      bcSum: bcSum,
    }));
  }

  if (name === "bcBjan") {
    const { bcBdanga, bcBcost, bcPjan, bcSumP, bcPkum, bcPsum } = getValues();
    let bcSumB: number = 0;
    let bcBkum: number = 0;
    let bcBsum: number = 0;
    let bcJTotal: number = 0;
    let bcSumTotal: number = 0;
    let bcSumKum: number = 0;
    let bcSum: number = 0;

    bcSumB = sumB - parseInt(num === "" ? 0 : num);

    if (bcBdanga) {
      bcBkum = bcSumB * bcBdanga;
    }

    if (bcBcost) {
      bcBsum = bcBkum + +bcBcost;
    } else {
      bcBsum = bcBkum;
    }

    bcJTotal = parseInt(num === "" ? 0 : num) + +bcPjan;
    bcSumTotal = bcSumB + +bcSumP;
    bcSumKum = bcBkum + +bcPkum;
    bcSum = bcBsum + bcPsum;

    reset((formValues: any) => ({
      ...formValues,
      bcSumB: bcSumB,
      bcBkum: bcBkum,
      bcBsum: bcBsum,
      bcJTotal: bcJTotal,
      bcSumTotal: bcSumTotal,
      bcSumKum: bcSumKum,
      bcSum: bcSum,
    }));
  }

  if (name === "bcPdanga") {
    let bcPsum: number;
    const { bcSumP, bcPcost, bcBkum, bcBsum } = getValues();
    const bcPkum = bcSumP * parseInt(num === "" ? 0 : num);

    if (bcPcost) {
      bcPsum = bcPkum + +bcPcost;
    } else {
      bcPsum = bcPkum;
    }
    const bcSumKum = bcPkum + bcBkum;
    const bcSum = bcPsum + bcBsum;

    reset((formValues: any) => ({
      ...formValues,
      bcPkum: bcPkum,
      bcPsum: bcPsum,
      bcSumKum: bcSumKum,
      bcSum: bcSum,
    }));
  }

  if (name === "bcBdanga") {
    let bcBsum: number;
    const { bcSumB, bcBcost, bcPkum, bcPsum } = getValues();
    const bcBkum = bcSumB * parseInt(num === "" ? 0 : num);

    if (bcBcost) {
      bcBsum = bcBkum + +bcBcost;
    } else {
      bcBsum = bcBkum;
    }
    const bcSumKum = bcBkum + bcPkum;
    const bcSum = bcBsum + bcPsum;

    reset((formValues: any) => ({
      ...formValues,
      bcBkum: bcBkum,
      bcBsum: bcBsum,
      bcSumKum: bcSumKum,
      bcSum: bcSum,
    }));
  }

  if (name === "bcPcost") {
    const { bcPkum, bcBcost, bcBsum } = getValues();
    let bcSumCost: number = 0;
    let bcSum: number = 0;
    const bcPsum = bcPkum + parseInt(num === "" ? 0 : num);
    bcSumCost = parseInt(num === "" ? 0 : num) + +bcBcost + +data65?.bcGcost;
    bcSum = bcPsum + +bcBsum;

    reset((formValues: any) => ({
      ...formValues,
      bcPsum: bcPsum,
      bcSumCost: bcSumCost,
      bcSum: bcSum,
    }));
  }

  if (name === "bcBcost") {
    const { bcBkum, bcPcost, bcPsum } = getValues();
    let bcSumCost: number = 0;
    let bcSum: number = 0;
    const bcBsum = bcBkum + parseInt(num === "" ? 0 : num);
    bcSumCost = parseInt(num === "" ? 0 : num) + +bcPcost + +data65?.bcGcost;
    bcSum = +bcBsum + +bcPsum;

    reset((formValues: any) => ({
      ...formValues,
      bcBsum: bcBsum,
      bcSumCost: bcSumCost,
      bcSum: bcSum,
    }));
  }

  if (name === "bcOutkum") {
    const { bcInkum1, bcDc } = getValues();
    const bcMisu = +bcInkum1 - bcDc - parseInt(num === "" ? 0 : num);

    reset((formValues: any) => ({
      ...formValues,
      bcMisu: bcMisu,
    }));
  }

  if (name === "bcDc") {
    const { bcInkum1, bcOutkum } = getValues();
    const bcMisu = +bcInkum1 - bcOutkum - parseInt(num === "" ? 0 : num);

    reset((formValues: any) => ({
      ...formValues,
      bcMisu: bcMisu,
    }));
  }
};
// -----------------------------------------------------------------------------------------------------------------
export const calcTab1GridChange = (
  data65Detail: any,
  setBin: any,
  setPin: any,
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

    setPin(bcPin);
    setBin(bcBin);
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

export const calcFooterTab2 = (
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
