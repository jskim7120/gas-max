import styled from "styled-components";
import Checked from "assets/image/checked.png";
import { handleKeyDown } from "helpers/handleKeyDown";

const CheckBoxWrapper = styled.div<{ rtl: boolean; gap?: string }>`
  label {
    display: flex;
    align-items: center;
    flex-direction: ${(props) => (props.rtl ? "row" : "row-reverse")};
    gap: ${(props) =>
      props.rtl
        ? props.gap
          ? props.gap
          : "8px"
        : props.gap
        ? props.gap
        : "5px"};
    margin-right: ${(props) => props.rtl && "7px"};
    font-family: "NotoSansKRRegular";
    font-size: 15px;
    font-weight: 400;
  }

  input[type="checkbox"] {
    position: relative;
    outline: none;
    border: none;
  }

  input[type="checkbox"]:before {
    position: absolute;
    left: -2px;
    top: -2px;
    display: block;
    width: 14px;
    height: 14px;
    border: 2px solid #000;
    border-radius: 4px;
    border-top-right-radius: 0;

    content: "";
    background: #fff;
  }

  input[type="checkbox"]:after {
    position: absolute;
    display: block;
    left: 1px;
    top: 1px;
    width: 12px;
    height: 12px;
    content: "";
    background-repeat: no-repeat;
    background-position: center;
  }

  input[type="checkbox"]:checked:after {
    background-image: url(${Checked});
  }

  input[type="checkbox"]:focus:before,
  input[type="checkbox"]:not(:disabled):hover:before {
    border-color: #707070;
    background: #fffacd;
  }

  &.label-check {
    display: flex;
    justify-content: end;
    align-items: center;
  }
`;

function CheckBox(props: {
  title?: string;
  rtl?: boolean;
  register?: any;
  onChange?: any;
  gap?: string;
  checked?: boolean;
  style?: any;
  className?: any;
}) {
  return (
    <CheckBoxWrapper
      rtl={props.rtl ? props.rtl : false}
      gap={props.gap && props.gap}
      style={props.style}
      className={props.className && props.className}
    >
      <label>
        <input
          type="checkbox"
          {...props.register}
          onChange={props.onChange}
          checked={props.checked && props.checked}
          onKeyDown={handleKeyDown}
        />
        {props.title && props.title}
      </label>
    </CheckBoxWrapper>
  );
}

export default CheckBox;
