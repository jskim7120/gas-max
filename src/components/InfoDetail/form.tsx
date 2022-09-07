import React, { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import DatePicker from "react-datepicker";
import formatDate from "./dateFormat";

function CustomerForm({ data }: { data: any }) {
  const [swIndate, setSwIndate] = useState() as any;
  const [swJdate1, setSwJdate1] = useState() as any;
  const [swJdate2, setSwJdate2] = useState() as any;
  const [swGubun, setSwGubun] = useState() as any;
  const [swPaytype, setSwPaytype] = useState() as any;

  useEffect(() => {
    if (data) {
      data.swIndate && setSwIndate(new Date(formatDate(data.swIndate)));
      data.swJdate1 && setSwJdate1(new Date(formatDate(data.swJdate1)));
      data.swJdate2 && setSwJdate2(new Date(formatDate(data.swJdate2)));
      setSwGubun(data.swGubun);
      setSwPaytype(data.swPaytype);
    }
  }, [data]);

  return (
    <form>
      <Row>
        <Col>
          <div className="form-group">
            <label>사원코드</label>
            <input type="text" id="swCode" defaultValue={data?.swCode} />
          </div>
        </Col>
        <Col>
          <div className="form-group">
            <label>사원구분</label>

            <select
              name="swGubun"
              onChange={(e) => setSwGubun(e.target.value)}
              id="swGubun"
              value={swGubun}
            >
              <option value="0">0.배달사원</option>
              <option value="1">1.수송기사</option>
              <option value="2">2.기타</option>
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
              selected={swIndate}
              onChange={(date: Date) => setSwIndate(date)}
            />
          </div>
        </Col>
        <Col>
          <div className="form-group">
            <label>급여방식</label>
            <select
              id="swPaytype"
              onChange={(e) => setSwPaytype(e.target.value)}
              value={swPaytype}
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
            <input type="text" id="swDriverNo" defaultValue={data.swDriverNo} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="form-group">
            <label style={{ marginRight: "30px" }}>적성검사</label>
            <DatePicker
              selected={swJdate1}
              onChange={(date: Date) => setSwJdate1(date)}
            />
          </div>
        </Col>
        <Col>
          <div className="form-group">
            <label style={{ marginRight: "30px" }}>~</label>
            <DatePicker
              selected={swJdate2}
              onChange={(date: Date) => setSwJdate2(date)}
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
  );
}

export default CustomerForm;
