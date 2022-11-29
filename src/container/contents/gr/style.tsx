import styled from "styled-components";

// export const DetailHeader = styled.div`
//   background-color: #dbdbdb;
//   height: 35px;
//   display: flex;
//   align-items: center;
//   padding: 0 6px 0 15px;
//   border-bottom: 5px solid #707070;
// `;

export const Wrapper = styled.div`
  display: flex;
  gap: 0px;
  height: calc(100% - 6px);
  margin-top: 4px;
  border: 1px solid red;
`;

export const LeftSection = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "50%")};

  .top-header {
    background-color: #dbdbdb;
    height: 35px;
    border-bottom: 5px solid #707070;
    display: flex;
    align-items: center;
    padding-left: 12px;

    p {
      color: #0a0a0a;
      font-family: "SegoeUI";
      font-size: 12px;

      &.big {
        font-family: "NotoSansKRRegular";
        font-size: 14px;
        font-weight: bold;
        margin: 0 10px 0 15px;
      }
    }
  }
`;

export const RightSection = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "50%")};
  height: 100%;
  overflow-y: auto;

  .top-header {
    background-color: #dbdbdb;
    height: 35px;
    border-bottom: 5px solid #707070;
  }

  .with-border {
    border-left: 3px solid #707070;
  }
`;
