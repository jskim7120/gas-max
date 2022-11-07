import React from "react";
import DatePicker from "react-datepicker";
import { Input } from "components/form/style";
import { formatDateToString } from "helpers/dateFormat";
import CalendarIcon from "assets/image/calendar.png";
import { InputSize } from "components/componentsType";

interface IProps {
  value?: string;
  onClick?: any;
  placeholder?: any;
  register?: any;
  errors?: any;
  label?: string;
}

const CustomInput = React.forwardRef(
  (props: IProps, ref?: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
      <div
        style={{
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        onClick={props.onClick}
        ref={ref}
      >
        <Input
          register={props.register}
          errors={props.errors}
          label={props.label && props.label}
          style={{ border: "1px solid #e6e5e5" }}
        />
        <div
          style={{
            width: "30px",
            height: "25px",
            padding: "0px 0 0 9px",
            background: "#fff",
            border: "1px solid #e6e5e5",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            margin: "0 5px 0 -8px",
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
  reset,
  errors,
  label,
  name,
}: {
  register?: any;
  reset?: any;
  errors: any;
  label?: string;
  name: string;
}) {
  const handleDateChange = (date: Date) => {
    const stringDate = formatDateToString(date);

    reset({
      [name]: stringDate,
    });
  };
  return (
    <>
      <DatePicker
        wrapperClassName="datePicker"
        onChange={handleDateChange}
        showMonthDropdown
        showYearDropdown
        // dateFormat="MM/dd/yyyy h:mm aa"
        customInput={
          <CustomInput
            register={register}
            errors={errors}
            label={label && label}
          />
        }
      />
    </>
  );
}

export default CustomDate;
