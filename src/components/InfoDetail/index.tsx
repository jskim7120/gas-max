import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Wrapper } from "./style";
import { Row, Col } from "react-grid-system";
import formatDate from "./dateFormat";

function InfoDetail({ data }: { data: any }) {
  const [date0, setDate0] = useState() as any;
  const [date1, setDate1] = useState() as any;
  const [date2, setDate2] = useState() as any;
  const [select1, setSelect1] = useState() as any;
  const [select2, setSelect2] = useState() as any;

  useEffect(() => {
    if (data) {
      data.swIndate && setDate0(new Date(formatDate(data.swIndate)));
      data.swJdate1 && setDate1(new Date(formatDate(data.swJdate1)));
      data.swJdate2 && setDate2(new Date(formatDate(data.swJdate2)));
      console.log("data.swCode", data.swCode === "01");
      setSelect1(data.swCode);
      setSelect2(data.swPaytype);
    }
  }, [data]);

  return (
    <Wrapper>
      <form>
        <Row>
          <Col>
            <div className="form-group">
              <label>사원코드</label>
              <input type="text" id="swCode" defaultValue={data.areaCode} />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label>사원구분</label>
              {/* <input type="text" id="swGubun" defaultValue={data.swCode} /> */}

              <select
                name="swCode"
                onChange={(e) => setSelect1(e.target.value)}
                id="swCode"
                value={select1}
              >
                <option value="00">0.배달사원</option>
                <option value="01">1.수송기사</option>
                <option value="02">2.기타</option>
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label>사원명</label>
              <input type="text" id="swName" defaultValue={data.swName} />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label>주민번호</label>
              <input type="text" id="swJuminno" defaultValue={data.swJuminno} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label>전화번호</label>
              <input type="text" id="swTel" defaultValue={data.swTel} />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label>핸드폰</label>
              <input type="text" id="swHp" defaultValue={data.swHp} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label>주소</label>
              <input type="text" id="swAddr1" defaultValue={data.swAddr1} />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label></label>
              <input type="text" id="swAddr2" defaultValue={data.swAddr2} />
            </div>
          </Col>
        </Row>
        <div className="divider"></div>
        {/* -------------------------------------------------------------------------- */}
        <Row>
          <Col>
            <div className="form-group" style={{ position: "relative" }}>
              <label style={{ marginRight: "30px" }}>입사일자</label>

              <DatePicker
                selected={date0}
                onChange={(date: Date) => setDate1(date)}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label>급여방식</label>
              <select
                id="swPaytype"
                onChange={(e) => setSelect1(e.target.value)}
                value={select2}
              >
                <option value="0">0.월급제</option>
                <option value="1">1.수당제</option>
                <option value="2">2.월급+수당</option>
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label>급여액</label>
              <input type="text" id="swPaykum" defaultValue={data.swPaykum} />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label>급여일</label>
              <input
                type="text"
                id="swPaytdate"
                defaultValue={data.swPaytdate}
                // Limit
              />
              일
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label>면허종류</label>
              <input
                type="text"
                id="swDriverType"
                defaultValue={data.swDriverType}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label>면허번호</label>
              <input
                type="text"
                id="swDriverNo"
                defaultValue={data.swDriverNo}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label style={{ marginRight: "30px" }}>적성검사</label>
              {/* <input type="text" id="swJdate1" defaultValue={data.swJdate1} /> */}
              <DatePicker
                selected={date1}
                onChange={(date: Date) => setDate1(date)}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label style={{ marginRight: "30px" }}>~</label>
              {/* <input type="text" id="swJdate2" defaultValue={data.swJdate2} /> */}
              <DatePicker
                selected={date2}
                onChange={(date: Date) => setDate2(date)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label>비고</label>
              <input type="text" id="swBigo" defaultValue={data.swBigo} />
            </div>
          </Col>
        </Row>
        <div className="divider"></div>
        {/* -------------------------------------------------------------------------- */}
        <Row>
          <Col>
            <div className="form-group">
              <label>가불합계</label>
              <input type="text" id="blabla" defaultValue={0} />
            </div>
          </Col>
        </Row>
      </form>
    </Wrapper>
  );
}

export default InfoDetail;
