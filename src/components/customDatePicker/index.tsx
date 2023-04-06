import MaskedInput from "react-text-mask";
import DatePicker, { registerLocale } from "react-datepicker";
import styled from "styled-components";
import { DateWithDash, DateWithDashOnlyYearMonth } from "helpers/dateFormat";
import CalendarIcon from "assets/image/calendar.png";

import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

function CustomDatePicker({
  style,
  value,
  onChange,
  readOnly,
  name,
  showMonthYearPicker,
}: {
  style?: any;
  value: any;
  onChange: any;
  readOnly?: boolean;
  name?: string;
  showMonthYearPicker?: boolean;
}) {
  return (
    <DatePicker
      readOnly={readOnly}
      onChange={onChange}
      showMonthDropdown
      showYearDropdown
      showMonthYearPicker={showMonthYearPicker && showMonthYearPicker}
      locale="ko"
      customInput={
        <InputWrapper style={style}>
          <MaskedInput
            mask={
              showMonthYearPicker
                ? [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
                : [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]
            }
            value={
              showMonthYearPicker
                ? DateWithDashOnlyYearMonth(value)
                : DateWithDash(value)
            }
            className="customMaskInput"
            name={name && name}
          />
          <div className="calendarImageWrapper">
            <img src={CalendarIcon} alt="calendar" />
          </div>
        </InputWrapper>
      }
    />
  );
}

const InputWrapper = styled.div`
  height: 30px;
  width: 115px;
  position: relative;
  border: 1px solid rgb(188, 185, 185);
  border-radius: 4px;
  background: aliceblue;

  &:hover,
  &:hover .customMaskInput {
    background: #fffacd;
  }

  .customMaskInput {
    width: 85px;
    height: 17px;
    position: absolute;
    margin: 0;
    padding-left: 5px;
    top: 6px;
    left: 1px;
    border: none;
    outline: none;
    background: aliceblue;
    font-size: 15px;

    &:hover {
      background: #fffacd;
    }
  }

  .calendarImageWrapper {
    position: absolute;
    right: 0px;
    top: 2px;
    height: 100%;
    width: 20px;
    padding-left: 3px;
    border-left: 1px solid rgb(188, 185, 185);

    img {
      width: 13px;
      height: 14px;
    }
  }
`;

export default CustomDatePicker;
