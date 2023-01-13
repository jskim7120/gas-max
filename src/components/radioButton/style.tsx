import styled from "styled-components";
import radioCirclePNG from "assets/image/radio-circle.png";

export const Item = styled.div`
  display: inline-flex;
  margin-right: 1rem;
  align-items: center;
  position: relative;
  min-height: 1.5rem;
  padding-left: 1.5rem;
  line-height: 23px;
  height: 30.5px;
  box-sizing: border-box;
`;

export const RadioButtonLabel = styled.label<{ htmlFor: string }>`
  position: relative;
  margin-bottom: 0;
  cursor: pointer;
  font-family: "NotoSansKRRegular";
  font-size: 12px;

  ::after {
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
    box-sizing: border-box;
  }
  ::before {
    border-radius: 50%;
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: "";
    user-select: none;
    background-color: #fff;
    border: 1px solid #bbb;
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    box-sizing: border-box;
  }
`;
export const RadioButton = styled.input`
  box-sizing: border-box;
  padding: 0;
  left: -5px;
  position: absolute;
  z-index: 9;
  opacity: 0;
  overflow: visible;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:active + ${RadioButtonLabel}::before {
    background-color: #17aaff;
  }

  &:checked + ${RadioButtonLabel}::after {
    background-image: url(${radioCirclePNG});
  }

  &:checked + ${RadioButtonLabel}::before {
    background-color: #fff;
    border-color: #aeaeae;
    color: #aeaeae;
  }
`;

export const RadioButtonForm = styled.form`
  margin-left: -16px;
  display: flex;
  @media (max-width: 1000px) {
    margin-left: 16px;
    flex-direction: column;
  }
`;
