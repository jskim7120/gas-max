import styled, { css } from "styled-components";

export const DatePickerWrap = styled("div")<{ show: boolean }>`
  position: absolute;
  color: inherit;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  max-width: none;
  padding: 0;
  margin-top: 6px;
  z-index: 3001;
  font-family: arial;
  font-size: 15px;
  line-height: 1em;
  ${(props) =>
    props.show
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
  ::before {
    content: "";
    position: absolute;
    left: 9px;
    display: inline-block;
    top: -7px;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    border-bottom: 7px solid #ccc;
  }
  ::after {
    position: absolute;
    display: inline-block;
    border-bottom-color: rgba(0, 0, 0, 0.2);
    content: "";
    top: -6px;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
    border-left: 6px solid transparent;
    left: 10px;
  }
  @media (min-width: 564px) {
    direction: 1tr;
    text-align: left;
    /* top: 1615.72px; */
    right: auto;
  }
`;

export const DRP = styled("div")`
  max-width: 270px;
  display: block;
  padding: 8px 0 8px 8px;
  @media (min-width: 730px) {
    clear: none !important;
  }
  @media (min-width: 564px) {
    float: left;
    margin-right: 0;
  }
`;

export const CalenderTable = styled("div")`
  border: 1px solid #fff;
  border-radius: 4px;
  background-color: #fff;
  width: 100%;
  border: none;
  @media (min-width: 564px) {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 8px;
  }
`;

export const TableCondensed = styled("div")`
  width: 100%;
  margin: 0;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const TheadTh = styled("div")<{ drop?: boolean }>`
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  min-width: 32px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  white-space: nowrap;
  display: flex;
  text-align: center;
  gap: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    props.drop
      ? css`
          width: auto;
        `
      : css`
          width: 32px;
        `}
`;

export const DropDown = styled("select")<{ dropMonth?: boolean }>`
  text-transform: none;
  font-size: 12px;
  padding: 1px;
  margin: 0;
  height: auto;
  cursor: default;
  ${(props) =>
    props.dropMonth
      ? css`
          margin-right: 2px;
          width: 90px;
          float: right;
        `
      : css`
          width: 64px;
          float: left;
        `}
`;

export const Option = styled("option")`
  font-weight: normal;
  display: block;
  white-space: nowrap;
  min-height: 1.2em;
  padding: 0px 2px 1px;
`;

export const TbodyTd = styled("div")<{ off?: boolean; active?: boolean }>`
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  min-width: 32px;
  width: 32px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  white-space: nowrap;
  cursor: pointer;

  ${(props) =>
    props.off
      ? css`
          background-color: #fff;
          border-color: transparent;
          color: #999;
        `
      : ""}
  ${(props) =>
    props.active
      ? css`
          background-color: #357ebd;
          border-color: transparent;
          color: #fff;
        `
      : css`
          :hover {
            background: #f4f4f4;
          }
        `}
`;

export const Dateheader = styled("div")`
  display: flex;
  width: auto;
  justify-content: center;
  align-items: center;
`;

export const Tboody = styled("div")`
  margin-top: 5px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
