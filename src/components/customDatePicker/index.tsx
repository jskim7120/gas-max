import MaskedInput from "react-text-mask";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import { formatDateToString } from "helpers/dateFormat";
import CalendarIcon from "assets/image/calendar.png";

function CustomDatePicker({
  style,
  value,
  onChange,
  readOnly,
  name,
  showYearDropdown,
}: {
  style?: any;
  value: any;
  onChange: any;
  readOnly?: boolean;
  name?: string;
  showYearDropdown?: boolean;
}) {
  return (
    <DatePicker
      readOnly={readOnly}
      onChange={onChange}
      showMonthDropdown
      showYearDropdown
      showMonthYearPicker={showYearDropdown && showYearDropdown}
      dateFormat="yyyy-MM-dd"
      customInput={
        <InputWrapper style={style}>
          <MaskedInput
            mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
            value={
              typeof value === "string"
                ? value
                : value instanceof Date
                ? formatDateToString(value)
                : ""
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
  margin: 5px 5px 0 5px;
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
    top: 0px;
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
