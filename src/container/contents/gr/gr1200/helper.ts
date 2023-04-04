import { removeCommas } from "helpers/currency";

const calc1 = (
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
    const { bcGkum, bcPcost, bcBcost, bcPsum, bcBsum } = getValues();
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
    const { bcSum } = getValues();
    let bcMisu: number = 0;
    bcMisu =
      bcSum -
      (num ? +removeCommas(num, "number") : 0) -
      (bcDc ? +removeCommas(bcDc, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcMisu: bcMisu,
    }));
  }

  if (name === "bcDc") {
    const { bcSum } = getValues();
    let bcMisu: number = 0;
    bcMisu =
      bcSum -
      (num ? +removeCommas(num, "number") : 0) -
      (bcOutkum ? +removeCommas(bcOutkum, "number") : 0);

    reset((formValues: any) => ({
      ...formValues,
      bcMisu: bcMisu,
    }));
  }
};

export default calc1;
