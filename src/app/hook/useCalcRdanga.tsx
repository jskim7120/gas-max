import { useState } from "react";

function useRdanga() {
  const [rdangaType, setRdangaType] = useState<string>("");
  const [rdanga, setRdanga] = useState<string>("");
  const [rdangaSign, setRdangaSign] = useState<string>("");
  const [rdangaAmt, setRdangaAmt] = useState<string>("");
  const [totalValue, setTotalValue] = useState<string>("");

  const customEval = (t1: any, sign: any, t2: any) => {
    let tot = 0;
    let retVal = "";
    if (sign === null || sign === undefined) {
      retVal = ``;
    } else if (sign !== "X") {
      tot = eval(`${+t1} ${sign} ${+t2}`);
      retVal = `원 = ${tot}원`;
    } else {
      tot = eval(`${+t1} * ${t2} / 100`);
      retVal = `% = ${tot}원`;
    }
    return retVal;
  };

  const calcRdanga = (type: string, cur: any) => {
    let retSt = "";
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
