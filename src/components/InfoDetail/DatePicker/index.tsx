import { useState, useEffect, useRef } from "react";
import { YearSelect, MonthSelect } from "./DateDrop";
import {
  DatePickerWrap,
  DRP,
  CalenderTable,
  TableCondensed,
  TheadTh,
  Dateheader,
  TbodyTd,
  Tboody,
} from "./style";

const DatePicker = ({
  show,
  refs,
  setDate,
  dateChange,
}: {
  show: boolean;
  refs: React.MutableRefObject<HTMLDivElement>;
  setDate: Function;
  dateChange: string;
}) => {
  const date = new Date();
  const [state, setState] = useState<Array<number>>();
  const [Prevs, setSetPrevs] = useState<Array<number>>();
  const [Nexts, setSetNexts] = useState<Array<number>>();
  const [year, setYear] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<number>(date.getMonth() + 1);
  const [day, setDay] = useState(`${date.getDate()}` || null);
  const [currentWeek, setCurrentWeek] = useState<number>(date.getDay());
  const constyear = date.getFullYear();
  useEffect(() => {
    if (dateChange?.split("-").length === 3) {
      setYear(+dateChange?.split("-")[0]);
      setMonth(+dateChange?.split("-")[1]);
      setDay(dateChange?.split("-")[2]);
    }
    console.log(dateChange);
  }, [dateChange]);
  useEffect(() => {
    const FisrtDayOfMonth = (days: string) => {
      switch (days) {
        case "Mon":
          return 1;
        case "Tue":
          return 2;
        case "Wed":
          return 3;
        case "Thu":
          return 4;
        case "Fri":
          return 5;
        case "Sat":
          return 6;
        default:
          return 0;
      }
    };
    function getFirstDayOfMonth(year: number, month: number) {
      return new Date(year, month, 1);
    }
    let PresvM = new Date(year, month - 1, 0);
    let CurrM = new Date(year, month, 0);
    let NextM = new Date(year, month + 1, 0);
    const firstDay = getFirstDayOfMonth(year, month - 1);
    let prev = [];
    let curr = [];
    let Next = [];
    let FirstDay = +FisrtDayOfMonth(firstDay.toString().split(" ")[0]);
    if (month > 12) {
      setMonth(1);
      setYear(year + 1);
    } else if (month < 1) {
      setMonth(12);
      setYear(year - 1);
    }
    for (let i: number = 1; i <= +PresvM.toString().split(" ")[2]; i++) {
      prev.push(i);
    }
    setSetPrevs(prev.slice(prev.length - FirstDay, prev.length));
    for (let i: number = 1; i <= +CurrM.toString().split(" ")[2]; i++) {
      curr.push(i);
    }
    setState(curr);
    for (let i: number = 1; i <= +NextM.toString().split(" ")[2]; i++) {
      Next.push(i);
    }
    setSetNexts(Next.slice(0, 35 - FirstDay - curr.length + 7));
    setDate(`${year}-${month}-${day}`);
  }, [month, day, year, setDate]);

  return (
    <>
      <DatePickerWrap show={show} ref={refs}>
        <DRP>
          <CalenderTable>
            <TableCondensed>
              <Dateheader>
                <TheadTh
                  onClick={() => {
                    setMonth(month - 1);
                    setDay("1");
                  }}
                >
                  prev
                </TheadTh>
                <TheadTh drop={true}>
                  <YearSelect
                    year={year}
                    month={month}
                    setYear={setYear}
                    constyear={constyear + 1}
                  />
                  <MonthSelect
                    month={month}
                    currentWeek={currentWeek}
                    setMonth={setMonth}
                  />
                </TheadTh>
                <TheadTh
                  onClick={() => {
                    setMonth(month + 1);
                    setDay("1");
                  }}
                >
                  next
                </TheadTh>
              </Dateheader>
              <Tboody>
                <TbodyTd>토</TbodyTd>
                <TbodyTd>일</TbodyTd>
                <TbodyTd>월</TbodyTd>
                <TbodyTd>화</TbodyTd>
                <TbodyTd>수</TbodyTd>
                <TbodyTd>목</TbodyTd>
                <TbodyTd>금</TbodyTd>
                {Prevs?.map((e: number, i: number) => (
                  <TbodyTd
                    onClick={(e) => {
                      setMonth(month - 1);
                      setDay(e.currentTarget.textContent);
                    }}
                    off
                    key={e}
                  >
                    {e}
                  </TbodyTd>
                ))}
                {state?.map((e: number, i: number) => (
                  <TbodyTd
                    onClick={(e) => {
                      setDay(e.currentTarget.textContent);
                    }}
                    active={`${e}` === day}
                    key={e}
                  >
                    {e}
                  </TbodyTd>
                ))}
                {Nexts?.map((e: number, i: number) => (
                  <TbodyTd
                    onClick={(e) => {
                      setMonth(month + 1);
                      setDay(e.currentTarget.textContent);
                    }}
                    off
                    key={e}
                  >
                    {e}
                  </TbodyTd>
                ))}
              </Tboody>
            </TableCondensed>
          </CalenderTable>
        </DRP>
      </DatePickerWrap>
    </>
  );
};

export default DatePicker;
