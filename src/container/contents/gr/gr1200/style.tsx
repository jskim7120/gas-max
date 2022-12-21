import styled from "styled-components";

export const CustomTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  tr {
    th,
    td {
      font-size: 12px;
      font-weight: normal;
      height: 23px;
      border-bottom: 1px solid #707070;
      border-right: 1px solid #707070;
      padding: 0 7px;

      &:last-child {
        border-right: none;
      }

      &.orange {
        background: #f5cdae;
      }
      &.orange-light {
        background: #ffe4cf;
      }

      &.right {
        text-align: right;
      }

      &.center {
        text-align: center;
      }
    }
  }

  border-top: 1px solid #707070;
`;

export const CTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: #0a0a0a;

  tr {
    td,
    th {
      height: 22px;
      font-family: "NotoSansKRRegular";
      font-size: 12px;

      border-right: 1px solid #707070;

      &:last-child {
        border-right: none;
      }
    }

    td {
      &:first-child,
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5) {
        width: 12.5%;
      }
    }

    th {
      background-color: #b9d8f5;
      border-bottom: 1px solid #707070;
      border-top: 1px solid #707070;
    }
  }
`;

export const CTable2 = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  color: #0a0a0a;
  border-top: 1px solid #707070;
  tr {
    td,
    th {
      height: 22px;
      font-family: "NotoSansKRRegular";
      font-size: 12px;

      border-right: 1px solid #707070;

      &:last-child {
        border-right: none;
      }
    }

    th {
      background-color: #d4d0d0;
      border-bottom: 1px solid #707070;
      &.light-gray {
        background-color: #ececec;
      }
    }

    td {
      border-bottom: 1px solid #707070;
    }
  }
`;

export const TabLikeHeader = styled.div`
  height: 25px;
  width: 12.5%;
  background: #9ccdfc;
  border: 1px solid #707070;
  border-bottom: none;
  border-left: none;
  border-top-right-radius: 5px;
  text-align: center;
  font-family: SegoeUI;
  font-size: 14px;
  font-weight: 600;
  padding-top: 2px;
  color: #0a0a0a;
`;

export const CTitle = styled.div`
  background: #cacaca;
  width: 35px;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0a0a0a;
  border-top: 1px solid #707070;
  border-bottom: 1px solid #707070;
  font-family: "NotoSansKRRegular";
  font-size: 11px;
`;

export const CTextArea = styled.textarea`
  width: 100%;
  margin-right: 10px;
  outline: none;
  font-family: "NotoSansKRRegular";
  font-size: 12px;
  padding: 7px;
  resize: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const CLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #a7a7a7;
  width: 80px;
  height: 20px;
  border-radius: 2px;
  text-align: center;
  font-family: "NotoSansKRRegular";
  font-size: 11px;
`;
