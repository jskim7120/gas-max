import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Checked from "assets/image/checked.png";

const CheckBoxWrapper = styled.div<{ rtl: boolean }>`
  label {
    display: flex;
    align-items: center;
    flex-direction: ${(props) => (props.rtl ? "row" : "row-reverse")};
    gap: ${(props) => (props.rtl ? "8px" : "5px")};
    font-family: "NotoSansKRRegular";
    font-size: 12px;
    font-weight: 600;
  }

  input[type="checkbox"]:before {
    position: relative;
    left: -1px;
    top: -1px;
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
    position: relative;
    display: block;
    left: 2px;
    top: -16px;
    width: 12px;
    height: 12px;
    content: "";
    background-repeat: no-repeat;
    background-position: center;
  }

  input[type="checkbox"]:checked:after {
    background-image: url(${Checked});
  }

  // input[type="checkbox"]:disabled:after {
  //   -webkit-filter: opacity(0.4);
  // }

  // input[type="checkbox"]:not(:disabled):checked:hover:after {
  //   background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC");
  // }

  // input[type="checkbox"]:not(:disabled):hover:after {
  // }

  input[type="checkbox"]:not(:disabled):hover:before {
    border-color: #707070;
  }
`;

function CheckBox2({
  name,
  rtl = false,
  defaultChecked,
}: {
  name?: string;
  rtl?: boolean;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <CheckBoxWrapper rtl={rtl}>
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
        />
        {name && name}
      </label>
    </CheckBoxWrapper>
  );
}

export default CheckBox2;
