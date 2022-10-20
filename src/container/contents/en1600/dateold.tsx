import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { formatDateToString } from "helpers/dateFormat";
import { Input } from "components/form/style";
import CalendarIcon from "assets/image/calendar.png";

interface IProps {
  value?: string;
  onClick?: any;
  placeholder?: any;
  register?: any;
  errors?: any;
  label?: string;
  date?: string;
}

const CustomInput = React.forwardRef(
  (props: IProps, ref?: React.ForwardedRef<HTMLDivElement>): any => {
    return (
      <div
        style={{
          position: "relative",
        }}
        onClick={props.onClick}
        ref={ref}
      >
        <Input
          register={props.register}
          errors={props.errors}
          label={props.label}
          style={{ border: "1px solid #e6e5e5" }}
          value={props.date && props.date}
        />
        <div
          style={{
            position: "absolute",
            width: "30px",
            height: "25px",
            right: "5px",
            top: "5px",
            padding: "0px 0 0 9px",
            background: "#fff",
            border: "1px solid #e6e5e5",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
        >
          <img src={CalendarIcon} />
        </div>
      </div>
    );
  }
);

function CustomDate({
  register,
  errors,
  label,
  onChange,
}: {
  register?: any;

  errors: any;
  label: string;
  onChange: (date: Date) => void;
}) {
  const [date, setDate] = useState<string>("");
  const handleChange = (date: Date) => {
    const stringDate = formatDateToString(date);
    setDate(stringDate);
  };
  return (
    <>
      <DatePicker
        wrapperClassName="datePicker"
        onChange={handleChange}
        showMonthDropdown
        showYearDropdown
        customInput={
          <CustomInput
            register={register}
            errors={errors}
            label={label}
            date={date}
          />
        }
      />
    </>
  );
}

export default CustomDate;
