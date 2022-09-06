import styled from "styled-components";

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  color: #333;
  width: 771px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  border-left: 1px solid #d6d2ce;
  border-bottom: 1px solid #000;

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
        padding: 7px 10px;
      }
    }
  }
  tbody {
    tr {
      td {
        text-align: center;
        padding: 7px 10px;
        border-bottom: 1px solid #d6d2ce;
        border-right: 1px solid #d6d2ce;
      }
    }
    tr.active {
      background: #ffffe1;
    }
  }
`;

export default Table;
