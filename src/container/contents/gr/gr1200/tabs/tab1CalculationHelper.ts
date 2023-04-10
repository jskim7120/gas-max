import { removeCommas } from "helpers/currency";

export const calcByOnChange = (
  name: string,
  num: any,
  reset: Function,
  getValues: Function,
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
  if (name === "bcPjan") {
    const { bcPin, bcSumB, bcBkum, bcGkum, bcBsum, bcGsum } = getValues();

    let bcSumP: number = 0;
    let bcPkum: number = 0;
    let bcPsum: number = 0;
    let bcJTotal: number = 0;
    let bcSumTotal: number = 0;
    let bcSumKum: number = 0;
    let bcSum: number = 0;
    let bcSupplyAmt: number = 0;
    let bcVatAmt: number = 0;
    let bcMisu: number = 0;

    bcSumP =
      (bcPin ? +removeCommas(bcPin, "number") : 0) -
      +removeCommas(num, "number");
    bcPkum = bcSumP * (bcPdanga ? +removeCommas(bcPdanga, "number") : 0);
    bcPsum = bcPkum + (bcPcost ? +removeCommas(bcPcost, "number") : 0);
    bcJTotal =
      +removeCommas(num, "number") +
      (bcBjan ? +removeCommas(bcBjan, "number") : 0);

    bcSumTotal = bcSumP + (bcSumB ? +removeCommas(bcSumB, "number") : 0);
    bcSumKum =
      bcPkum +
      (bcBkum ? +removeCommas(bcBkum, "number") : 0) +
      (bcGkum ? +removeCommas(bcGkum, "number") : 0);

    bcSum =
      bcPsum +
      (bcBsum ? +removeCommas(bcBsum, "number") : 0) +
      (bcGsum ? +removeCommas(bcGsum, "number") : 0);

    bcSupplyAmt = Math.round(bcSum / 1.1);
    bcVatAmt = bcSum - bcSupplyAmt;

    bcMisu =
      bcSum -
      (bcOutkum ? +removeCommas(bcOutkum, "number") : 0) -
      (bcDc ? +removeCommas(bcDc, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcSumP: bcSumP,
      bcPkum: bcPkum,
      bcPsum: bcPsum,
      bcJTotal: bcJTotal,
      bcSumTotal: bcSumTotal,
      bcSumKum: bcSumKum,
      bcSum: bcSum,
      bcInkum: bcSum,
      bcInkum1: bcSum,
      bcSupplyAmt: bcSupplyAmt,
      bcVatAmt: bcVatAmt,
      bcMisu: bcMisu,
    }));
  }
  if (name === "bcBjan") {
    const { bcBin, bcSumP, bcPkum, bcGkum, bcPsum, bcGsum } = getValues();

    let bcSumB: number = 0;
    let bcBkum: number = 0;
    let bcBsum: number = 0;
    let bcJTotal: number = 0;
    let bcSumTotal: number = 0;
    let bcSumKum: number = 0;
    let bcSum: number = 0;
    let bcSupplyAmt: number = 0;
    let bcVatAmt: number = 0;
    let bcMisu: number = 0;

    bcSumB =
      (bcBin ? +removeCommas(bcBin, "number") : 0) -
      +removeCommas(num, "number");
    bcBkum = bcSumB * (bcBdanga ? +removeCommas(bcBdanga, "number") : 0);
    bcBsum = bcBkum + (bcBcost ? +removeCommas(bcBcost, "number") : 0);
    bcJTotal =
      +removeCommas(num, "number") +
      (bcPjan ? +removeCommas(bcPjan, "number") : 0);
    bcSumTotal = bcSumB + (bcSumP ? +removeCommas(bcSumP, "number") : 0);
    bcSumKum =
      bcBkum +
      (bcPkum ? +removeCommas(bcPkum, "number") : 0) +
      (bcGkum ? +removeCommas(bcGkum, "number") : 0);

    bcSum =
      bcBsum +
      (bcPsum ? +removeCommas(bcPsum, "number") : 0) +
      (bcGsum ? +removeCommas(bcGsum, "number") : 0);

    bcSupplyAmt = Math.round(bcSum / 1.1);
    bcVatAmt = bcSum - bcSupplyAmt;

    bcMisu =
      bcSum -
      (bcOutkum ? +removeCommas(bcOutkum, "number") : 0) -
      (bcDc ? +removeCommas(bcDc, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcSumB: bcSumB,
      bcBkum: bcBkum,
      bcBsum: bcBsum,
      bcJTotal: bcJTotal,
      bcSumTotal: bcSumTotal,
      bcSumKum: bcSumKum,
      bcSum: bcSum,
      bcInkum: bcSum,
      bcInkum1: bcSum,
      bcSupplyAmt: bcSupplyAmt,
      bcVatAmt: bcVatAmt,
      bcMisu: bcMisu,
    }));
  }

  if (name === "bcPdanga") {
    const { bcSumP, bcBkum, bcGkum, bcBsum, bcGsum } = getValues();
    let bcPkum: number = 0;
    let bcPsum: number = 0;
    let bcSumKum: number = 0;
    let bcSum: number = 0;
    let bcSupplyAmt: number = 0;
    let bcVatAmt: number = 0;
    let bcMisu: number = 0;

    bcPkum = bcSumP * (num ? +removeCommas(num, "number") : 0);
    bcPsum = bcPkum + (bcPcost ? +removeCommas(bcPcost, "number") : 0);
    bcSumKum =
      bcPkum +
      (bcBkum ? +removeCommas(bcBkum, "number") : 0) +
      (bcGkum ? +removeCommas(bcGkum, "number") : 0);

    bcSum =
      bcPsum +
      (bcBsum ? +removeCommas(bcBsum, "number") : 0) +
      (bcGsum ? +removeCommas(bcGsum, "number") : 0);
    bcSupplyAmt = Math.round(bcSum / 1.1);
    bcVatAmt = bcSum - bcSupplyAmt;

    bcMisu =
      bcSum -
      (bcOutkum ? +removeCommas(bcOutkum, "number") : 0) -
      (bcDc ? +removeCommas(bcDc, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcPkum: bcPkum,
      bcPsum: bcPsum,
      bcSumKum: bcSumKum,
      bcSum: bcSum,
      bcInkum: bcSum,
      bcInkum1: bcSum,
      bcSupplyAmt: bcSupplyAmt,
      bcVatAmt: bcVatAmt,
      bcMisu: bcMisu,
    }));
  }

  if (name === "bcBdanga") {
    const { bcSumB, bcPkum, bcGkum, bcPsum, bcGsum } = getValues();
    let bcBkum: number = 0;
    let bcBsum: number = 0;
    let bcSumKum: number = 0;
    let bcSum: number = 0;
    let bcSupplyAmt: number = 0;
    let bcVatAmt: number = 0;
    let bcMisu: number = 0;

    bcBkum = bcSumB * (num ? +removeCommas(num, "number") : 0);
    bcBsum = bcBkum + (bcBcost ? +removeCommas(bcBcost, "number") : 0);

    bcSumKum =
      bcBkum +
      (bcPkum ? +removeCommas(bcPkum, "number") : 0) +
      (bcGkum ? +removeCommas(bcGkum, "number") : 0);

    bcSum =
      bcBsum +
      (bcPsum ? +removeCommas(bcPsum, "number") : 0) +
      (bcGsum ? +removeCommas(bcGsum, "number") : 0);
    bcSupplyAmt = Math.round(bcSum / 1.1);
    bcVatAmt = bcSum - bcSupplyAmt;

    bcMisu =
      bcSum -
      (bcOutkum ? +removeCommas(bcOutkum, "number") : 0) -
      (bcDc ? +removeCommas(bcDc, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcBkum: bcBkum,
      bcBsum: bcBsum,
      bcSumKum: bcSumKum,
      bcSum: bcSum,
      bcInkum: bcSum,
      bcInkum1: bcSum,
      bcSupplyAmt: bcSupplyAmt,
      bcVatAmt: bcVatAmt,
      bcMisu: bcMisu,
    }));
  }

  if (name === "bcPcost") {
    const { bcPkum, bcBsum, bcGsum } = getValues();
    let bcSum: number = 0;
    let bcSupplyAmt: number = 0;
    let bcVatAmt: number = 0;
    let bcMisu: number = 0;
    let bcSumCost: number = 0;

    let bcPsum = bcPkum + (num ? +removeCommas(num, "number") : 0);
    bcSumCost =
      (num ? +removeCommas(num, "number") : 0) +
      (bcBcost ? +removeCommas(bcBcost, "number") : 0) +
      (bcGcost ? +removeCommas(bcGcost, "number") : 0);

    bcSum =
      bcPsum +
      (bcBsum ? +removeCommas(bcBsum, "number") : 0) +
      (bcGsum ? +removeCommas(bcGsum, "number") : 0);
    bcSupplyAmt = Math.round(bcSum / 1.1);
    bcVatAmt = bcSum - bcSupplyAmt;

    bcMisu =
      bcSum -
      (bcOutkum ? +removeCommas(bcOutkum, "number") : 0) -
      (bcDc ? +removeCommas(bcDc, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcPsum: bcPsum,
      bcSumCost: bcSumCost,
      bcSum: bcSum,
      bcInkum: bcSum,
      bcInkum1: bcSum,
      bcSupplyAmt: bcSupplyAmt,
      bcVatAmt: bcVatAmt,
      bcMisu: bcMisu,
    }));
  }

  if (name === "bcBcost") {
    const { bcBkum, bcPsum, bcGsum } = getValues();
    let bcSum: number = 0;
    let bcSupplyAmt: number = 0;
    let bcVatAmt: number = 0;
    let bcMisu: number = 0;
    let bcSumCost: number = 0;

    let bcBsum = bcBkum + (num ? +removeCommas(num, "number") : 0);
    bcSumCost =
      (num ? +removeCommas(num, "number") : 0) +
      (bcPcost ? +removeCommas(bcPcost, "number") : 0) +
      (bcGcost ? +removeCommas(bcGcost, "number") : 0);

    bcSum =
      bcBsum +
      (bcPsum ? +removeCommas(bcPsum, "number") : 0) +
      (bcGsum ? +removeCommas(bcGsum, "number") : 0);
    bcSupplyAmt = Math.round(bcSum / 1.1);
    bcVatAmt = bcSum - bcSupplyAmt;

    bcMisu =
      bcSum -
      (bcOutkum ? +removeCommas(bcOutkum, "number") : 0) -
      (bcDc ? +removeCommas(bcDc, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcBsum: bcBsum,
      bcSumCost: bcSumCost,
      bcSum: bcSum,
      bcInkum: bcSum,
      bcInkum1: bcSum,
      bcSupplyAmt: bcSupplyAmt,
      bcVatAmt: bcVatAmt,
      bcMisu: bcMisu,
    }));
  }
  if (name === "bcGcost") {
    const { bcGkum, bcPsum, bcBsum } = getValues();
    let bcGsum: number = 0;
    let bcSumCost: number = 0;
    let bcSum: number = 0;
    let bcSupplyAmt: number = 0;
    let bcVatAmt: number = 0;
    let bcMisu: number = 0;

    bcGsum =
      (bcGkum ? +removeCommas(bcGkum, "number") : 0) +
      (num ? +removeCommas(num, "number") : 0);

    bcSumCost =
      (num ? +removeCommas(num, "number") : 0) +
      (bcPcost ? +removeCommas(bcPcost, "number") : 0) +
      (bcBcost ? +removeCommas(bcBcost, "number") : 0);

    bcSum =
      bcGsum +
      (bcPsum ? +removeCommas(bcPsum, "number") : 0) +
      (bcBsum ? +removeCommas(bcBsum, "number") : 0);

    bcSupplyAmt = Math.round(bcSum / 1.1);
    bcVatAmt = bcSum - bcSupplyAmt;

    bcMisu =
      bcSum -
      (bcOutkum ? +removeCommas(bcOutkum, "number") : 0) -
      (bcDc ? +removeCommas(bcDc, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcGsum: bcGsum,
      bcSumCost: bcSumCost,
      bcSum: bcSum,
      bcInkum: bcSum,
      bcInkum1: bcSum,
      bcSupplyAmt: bcSupplyAmt,
      bcVatAmt: bcVatAmt,
      bcMisu: bcMisu,
    }));
  }

  if (name === "bcOutkum") {
    const { bcInkum1 } = getValues();

    let bcMisu: number = 0;
    bcMisu =
      bcInkum1 -
      (num ? +removeCommas(num, "number") : 0) -
      (bcDc ? +removeCommas(bcDc, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcMisu: bcMisu,
    }));
  }

  if (name === "bcDc") {
    const { bcInkum1 } = getValues();
    let bcMisu: number = 0;
    bcMisu =
      bcInkum1 -
      (num ? +removeCommas(num, "number") : 0) -
      (bcOutkum ? +removeCommas(bcOutkum, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcMisu: bcMisu,
    }));
  }
};

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
    bcSumTotal = bcSumP + bcSumB;
    bcSumKum = bcPkum + bcBkum + +data65?.bcGkum;
    bcSumCost =
      (bcPcost ? +removeCommas(bcPcost, "number") : 0) +
      (bcBcost ? +removeCommas(bcBcost, "number") : 0) +
      (bcGcost ? +removeCommas(bcGcost, "number") : 0);
    bcSum = bcPsum + bcBsum + +data65?.bcGsum;

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
