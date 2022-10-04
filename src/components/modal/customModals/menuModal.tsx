import React from "react";
import styled from "styled-components";
import { User } from "components/allSvgIcon";

const ModalWrapper = styled.div`
  width: 320px;
  height: 389px;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 2px;

  .section {
    position: relative;
    border-radius: 5px;
    background: turquoise;
    border-radius: 5px;
    margin-bottom: 4px;
    padding: 10px 5px;

    p {
      writing-mode: vertical-lr;
      text-orientation: mixed;
      color: #fff;
    }

    span {
      color: #000;
      background: #fff;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 35px;
      height: 100%;
      border-radius: 5px;
      border: 1px solid #707070;
      padding: 10px 5px;
    }
  }
`;

function MenuModal() {
  return (
    <ModalWrapper>
      <div className="section">
        <p>first</p>
        <span>cccc</span>
      </div>
      <div className="section">
        <p>second</p>
        <span>dddd</span>
      </div>
      <div className="section">
        <p>third</p>
        <span>ggggg</span>
      </div>
    </ModalWrapper>
  );
}

export default MenuModal;
