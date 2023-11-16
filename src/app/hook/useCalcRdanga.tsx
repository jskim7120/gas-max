import { useState } from "react";

function useRdanga() {
  const [rdangaType, setRdangaType] = useState<string>("");
  const [rdanga, setRdanga] = useState<string>("");
  const [rdangaSign, setRdangaSign] = useState<string>("");
  const [rdangaAmt, setRdangaAmt] = useState<string>("");
  const [totalValue, setTotalValue] = useState<string>("");

  const customEval = (t1: any, sign: any, t2: any) => {
    console.log("custom eval duudagdav :::");
    console.log("t1:", t1);
    console.log("sign:", sign);
    console.log("t2:", t2);

    //let tot = 0;
    let retVal: number = 0;
    /*
    if (sign === null || sign === undefined) {
      retVal = ``;
    } else if (sign !== "X") {
      tot = eval(`${+t1} ${sign} ${+t2}`);
      retVal = `원 = ${tot}원`;
    } else {
      tot = eval(`${+t1} * ${t2} / 100`);
      retVal = `% = ${tot}원`;
    }
    */
    if (sign === "+") {
      retVal = +t1 + +t2;
    } else if (sign === "-") {
      retVal = +t1 - +t2;
    } else if (sign === "X") {
      retVal = +t1 * +t2;
    }

    return `${retVal}`;
  };

  const calcRdanga = (type: string, cur: any) => {
    let retSt: string = "";
    if (type === "rdanga") {
      retSt = customEval(cur, rdangaSign, rdangaAmt);
    }

    if (type === "rdangaSign") {
      retSt = customEval(rdanga, cur, rdangaAmt);
    }

    if (type === "rdangaAmt") {
      retSt = customEval(rdanga, rdangaSign, cur);
    }

    if (type === "rdangaType" && cur === "1") {
      retSt = customEval(rdanga, rdangaSign, rdangaAmt);
    }

    setTotalValue(retSt);
  };

  return {
    rdangaType,
    setRdangaType,
    rdanga,
    setRdanga,
    rdangaSign,
    setRdangaSign,
    rdangaAmt,
    setRdangaAmt,
    totalValue,
    setTotalValue,
    calcRdanga,
  };
}

export default useRdanga;
