import styled from "styled-components";

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  color: #333;
  width: 100%;
  border-left: 1px solid #d6d2ce;
  font-family: "NotoSansKRRegular";
  font-size: 12px;
  flex: 1;
  display: block;
  overflow-x: auto;
  white-space: nowrap;

  thead {
    tr {
      background-color: #f5f5f5;
      color: #424242;

      th {
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        border-right: 1px solid #d6d2ce;
        font-weight: 500;
        padding: 6px 10px;
      }
    }
  }
  tbody {
    tr {
      td {
        text-align: center;
        padding: 0px 20px;
        border-bottom: 1px solid #d6d2ce;
        border-right: 1px solid #d6d2ce;
        font-size: 12px;
      }
    }
    tr.active {
      background: #ffffe1;
    }
  }
`;

export default Table;
