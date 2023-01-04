import styled from "styled-components";

export const GrFooter1300Cnt = styled.div`
  .cTitle {
    border: none;
  }
  .cTextArea {
    margin-right: 2px;
    margin-left: 0.8px;
    border-radius: 4px;
  }
  .cTable {
    .right {
      text-align: right;
      padding-right: 6px;
    }
    th {
      height: 23px;
    }
    td {
      height: 24px;
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
      height: 23px;
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
