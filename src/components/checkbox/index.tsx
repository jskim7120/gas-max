import styled from "styled-components";
import Checked from "assets/image/checked.png";

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
    font-family: "NotoSansKRRegular";
    font-size: 15px;
    font-weight: 400;
    width: max-content;
  }

  input[type="checkbox"]:before {
    position: relative;
    left: 0px;
    top: -3px;
    display: block;
    width: 17px;
    height: 17px;
    border: 2px solid #000;
    border-radius: 4px;
    border-top-right-radius: 0;

    content: "";
    background: #fff;
  }

  input[type="checkbox"]:after {
    position: relative;
    display: block;
    left: 4.5px;
    top: -19px;
    width: 12px;
    height: 12px;
    content: "";
    background-repeat: no-repeat;
    background-position: center;
  }

  input[type="checkbox"]:checked:after {
    background-image: url(${Checked});
  }

  input[type="checkbox"]:not(:disabled):hover:before {
    border-color: #707070;
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
}) {
  return (
    <CheckBoxWrapper
      rtl={props.rtl ? props.rtl : false}
      gap={props.gap && props.gap}
      style={props.style}
    >
      <label>
        <input
          type="checkbox"
          {...props.register}
          onChange={props.onChange}
          checked={props.checked && props.checked}
        />
        {props.title && props.title}
      </label>
    </CheckBoxWrapper>
  );
}

export default CheckBox;
