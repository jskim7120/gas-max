import styled from "styled-components";

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  color: #333;
  width: 100%;
  border-left: 1px solid #d6d2ce;
  font-family: "NotoSansKRRegular";
  font-size: 15px;
  flex: 1;
  display: block;
  overflow-x: auto;
  white-space: nowrap;

  thead {
    tr {
      background-color: #f5f5f5;
      color: #424242;

      th {
        border: 1px solid #d6d2ce;
        border-left: none;
        font-weight: 500;
        padding: 3px 5px;
        width: auto;
      }
    }
  }
  tbody {
    tr {
      td {
        text-align: center;
        padding: 0px 5px;
        border-bottom: 1px solid #d6d2ce;
        border-right: 1px solid #d6d2ce;
        font-size: 15px;
        height: 40px;
      }
    }
    tr.active {
      // background: #ffffe1;
    }
  }

  &.no-space {
    td {
      padding: 0;
    }
    th {
      width: auto;
      padding: 2px 0;
    }
  }
`;

export default Table;
