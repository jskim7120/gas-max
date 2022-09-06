import { DropDown, Option } from "./style";
import { useState, useEffect } from "react";
import { listenerCount } from "process";
export const YearSelect = ({
  month,
  year,
  setYear,
  constyear,
}: {
  month: number;
  year: number;
  setYear: Function;
  constyear: number;
}) => {
  const [years, setYears] = useState([1]);
  useEffect(() => {
    let list = [];
    for (let i = 1901; i <= constyear; i++) {
      list.push(i);
    }
    setYears(list);
  }, [constyear, month]);
  return (
    <>
      <DropDown value={year} onChange={(e) => setYear(e.target.value)}>
        {years.map((e: number) => (
          <Option key={e}>{e}</Option>
        ))}
      </DropDown>
    </>
  );
};

const Months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const MonthSelect = ({
  month,
  currentWeek,
  setMonth,
}: {
  month: number;
  currentWeek: number;
  setMonth: Function;
}) => {
  return (
    <>
      <DropDown
        dropMonth={true}
        value={`${month} 월`}
        onChange={(e) => setMonth(+e.target.value.split(" ")[0])}
      >
        {Months.map((e: number) => (
          <Option key={e}> {e} 월</Option>
        ))}
      </DropDown>
    </>
  );
};
