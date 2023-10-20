import styled from "styled-components";

export const CustomTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  tr {
    th,
    td {
      font-size: 14px;
      font-weight: normal;
      height: 23px;
      border-bottom: 1px solid rgb(188, 185, 185);
      border-right: 1px solid rgb(188, 185, 185);
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
  border-right: 1px solid rgb(188, 185, 185);
  border-top: 1px solid rgb(188, 185, 185);
`;

export const CTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: #4e545f;
  border-right: 1px solid rgb(188, 185, 185);

  tr {
    td,
    th {
      height: 22px;
      font-family: "NotoSansKRRegular";
      font-size: 14px;
      border-right: 1px solid rgb(188, 185, 185);
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

      input,
      select {
        margin: 1px 2px;
      }
    }

    th {
      background-color: #b9d8f5;
      border-bottom: 1px solid rgb(188, 185, 185);
      border-top: 1px solid rgb(188, 185, 185);
    }
  }
`;

export const CTable2 = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  color: #4e545f;
  border-top: 1px solid rgb(188, 185, 185);
  border-right: 1px solid rgb(188, 185, 185);

  tr {
    &.active {
      background: #3297fd;
    }

    &:hover {
      background: #3297fd;
    }

    td,
    th {
      font-family: "NotoSansKRRegular";
      font-size: 14px;
      border-left: 1px solid rgb(188, 185, 185);
    }

    th {
      position: sticky;
      top: 0;
      background-color: #d4d0d0;
      border-bottom: 1px solid rgb(188, 185, 185);
      border-top: 1px solid rgb(188, 185, 185);

      &.light-gray {
        background-color: #ececec;
      }
    }

    td {
      border-bottom: 1px solid rgb(188, 185, 185);
      cursor: pointer;

      input {
        margin: 1px 2px;
      }
    }
  }
`;

export const TabLikeHeader = styled.div`
  height: 25px;
  width: 12.5%;
  background: #9ccdfc;
  border: 1px solid rgb(188, 185, 185);
  border-bottom: none;
  border-left: none;
  border-top-right-radius: 5px;
  text-align: center;
  font-family: SegoeUI;
  font-size: 14px;
  font-weight: 600;
  padding-top: 2px;
  color: #fff;
`;

export const CTitle = styled.div`
  width: 35px;
  height: 68px;
  background-color: #d4d0d0;
  padding: 22px 0 15px 5.5px;
  color: #4e545f;
  border-top: 1px solid rgb(188, 185, 185);
  border-bottom: 1px solid rgb(188, 185, 185);
  font-family: "NotoSansKRRegular";
  font-size: 14px;
  font-weight: 600;
`;

export const CTextArea = styled.textarea`
  width: 100%;
  margin-right: 10px;
  outline: none;
  font-family: "NotoSansKRRegular";
  font-size: 14px;
  padding: 7px;
  resize: none;
  border: 1px solid rgb(188, 185, 185);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const CLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 20px;
  background-color: #d4d0d0;
  border: 1px solid rgb(188, 185, 185);
  color: #4e545f;
  border-radius: 2px;
  font-family: "NotoSansKRRegular";
  font-size: 14px;
  font-weight: 600;
`;

export const CircleBtn = styled.span`
  background: #aeaeae;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  line-height: 25px;
  color: red;
  cursor: pointer;
  &:hover {
    background: rgba(174, 174, 174, 0.7);
  }
`;
