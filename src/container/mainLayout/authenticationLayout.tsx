import React from "react";
import styled from "styled-components";
import Logo from "assets/image/JOALogin.png";
import Circle from "assets/image/Circle.png";

const Outer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  box-sizing: content-box;
  width: 361px;
  padding: 0;
  border: 1px solid #707070;
  position: relative;

  .header {
    width: 100%;
    height: 41px;
    display: flex;
    align-items: center;
    justify-content: center;

    background: #0098ff;

    span {
      color: #fff;
      font-family: "NotoSansKRRegular";
      font-size: 18px;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 54px 0 66px 0;
  }

  .footer {
    width: 100%;

    .contact {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 25px;

      img {
        margin-right: 13px;
      }
      p {
        font-family: "NotoSansKRRegular";
        font-size: 14px;
        font-weight: 500;
        color: #555555;
      }

      p.sub_text {
        font-family: "NotoSansKRRegular";
        font-size: 12px;
        color: #0098ff;
      }
    }

    .address {
      height: 52px;
      width: 100%;
      background: #5b5b5b;
      color: #fff;
      font-family: "NotoSansKRRegular";
      font-size: 12px;
      padding: 6px 30px;
      text-align: center;
    }
  }
`;

function AuthenticationLayout({ children }: { children: JSX.Element }) {
  return (
    <Outer>
      <Container>
        <div className="header handle">
          <span>로그인</span>
        </div>

        <div className="logo">
          <img src={Logo} />
        </div>

        {children}

        <div className="footer">
          <div className="contact">
            <img src={Circle} />
            <span>
              <p>고객센터 : 1566-2399</p>
              <p className="sub_text">상담사간 09:00 ~ 1800(평일)</p>
            </span>
          </div>
          <div className="address">
            (주)조아테크 | 서울시 광진구 자양번영로21 대양빌딩 3층 TEL :
            1566-2399, 1800-7148 / FAX : 02-452-4336
          </div>
        </div>
      </Container>
    </Outer>
  );
}

export default AuthenticationLayout;
