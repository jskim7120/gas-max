import styled from "styled-components";

export const Editable = styled.div<{ textAlign: string }>`
  position: relative;
  width: 157px;
  margin: 0 3px;
  ul {
    position: absolute;
    top: 30px;
    right: 0px;
    width: 100%;
    height: auto;

    list-style: none;
    border: 1px solid #686868;
    background: #fff;
    font-family: "NotoSansKRRegular";
    font-size: 14px;
    z-index: 10;
    box-shadow: 2px 1px 8px 0px rgb(151 150 150);

    li {
      text-align: left;
      padding: 2px;
      height: 23px;

      &:hover {
        background: #3297fd;
        color: #fff;
      }

      &.active {
        background: #3297fd;
        color: #fff;
      }
    }
  }

  svg {
    position: absolute;
    right: 2px;
    top: 10px;
  }

  input {
    height: 30px;
    width: 100%;
    border-radius: 4px;
    outline: none;
    font-family: "NotoSansKRRegular";
    font-size: 15px;
    border: 1px px solid #e6e5e5;
    background: aliceblue;
    border: 1px solid rgb(188, 185, 185);
    padding: 0 18px 0 6px;
    margin: 0px;
    text-align: ${(props) =>
      props.textAlign && props.textAlign === "left" && `left`};
    text-align: ${(props) =>
      props.textAlign && props.textAlign === "right" && `right`};

    &:hover,
    &:focus {
      background: #fffacd;
    }
  }
`;
