import React from "react";
import { useEffect, useState } from "react";
import { number } from "yup";
import { CustomTable } from "../gr1200/style";

function Table({ data }: { data: any }) {
  let defaultBbSum = 0;
  let defaultBbVat = 0;
  let defaultBbTotal = 0;
  let defaultBbOutkum = 0;
  let defaultBbDc = 0;
  let defaultBbCredit = 0;
  const [bbTotalSum, setbbTotalSum] = useState(0);
  const [bbTotalVat, setbbTotalVat] = useState(0);
  const [bbTotal, setbbTotal] = useState(0);
  const [bbTotalOutkum, setbbTotalOutkum] = useState(0);
  const [bbTotalDc, setbbTotalDc] = useState(0);
  const [bbTotalCredit, setbbTotalCredit] = useState(0);

  useEffect(() => {
    data.map(total);
    setbbTotalSum(defaultBbSum);
    setbbTotalVat(defaultBbVat);
    setbbTotal(defaultBbTotal);
    setbbTotalOutkum(defaultBbOutkum);
    setbbTotalDc(defaultBbDc);
    setbbTotalCredit(defaultBbCredit);
  }, [data]);

  function total(item: any) {
    if (item === undefined) {
      return null;
    }
    defaultBbSum = defaultBbSum + item.bbSum;
    defaultBbVat = defaultBbVat + item.bbVat;
    defaultBbTotal = defaultBbTotal + item.bbTotal;
    defaultBbOutkum = defaultBbOutkum + item.bbOutkum;
    defaultBbDc = defaultBbDc + item.bbDc;
    defaultBbCredit = defaultBbCredit + item.bbCredit;
  }
  return (
    <CustomTable>
      <tr>
        <th className="orange" rowSpan={2}>
          합 계
        </th>
        <th className="orange">공급액</th>
        <th className="orange">세액</th>
        <th className="orange">매입 합계</th>
        <th className="orange">지급액</th>
        <th className="orange">D/C</th>
        <th className="orange">외상 매입</th>
      </tr>

      <tr>
        <th className="orange-light right">{bbTotalSum}</th>
        <th className="orange-light right">{bbTotalVat}</th>
        <th className="orange-light right">{bbTotal}</th>
        <th className="orange-light right">{bbTotalOutkum}</th>
        <th className="orange-light right">{bbTotalDc}</th>
        <th className="orange-light right">{bbTotalCredit}</th>
      </tr>
    </CustomTable>
  );
}

export default Table;
