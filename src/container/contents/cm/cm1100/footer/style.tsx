import styled from "styled-components";

export const TabTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  tr {
    th,
    td {
      font-size: 14px;
      font-weight: normal;
      height: 29px;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;

      &.green {
        background: #d3e175;
      }

      &.light-green {
        background: #ebf69c;
      }

      &.blue {
        background: #98c9ed;
      }

      &.light-blue {
        background: #b8def9;
      }
    }
  }
`;
