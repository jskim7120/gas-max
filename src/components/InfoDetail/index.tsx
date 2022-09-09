import React, { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import DatePicker from "react-datepicker";
import formatDate from "../../helpers/dateFormat";
import { Wrapper } from "./style";

function InfoDetail({
  data,
  setSelectedCustomer,
}: {
  data: any;
  setSelectedCustomer: Function;
}) {
  const [dates, setDates] = useState({}) as any;

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const swIndate = data.swIndate ? new Date(formatDate(data.swIndate)) : "";
      const swJdate1 = data.swJdate1 ? new Date(formatDate(data.swJdate1)) : "";
      const swJdate2 = data.swJdate2 ? new Date(formatDate(data.swJdate2)) : "";
      setDates({ swIndate: swIndate, swJdate1: swJdate1, swJdate2: swJdate2 });
    }
  }, [data]);

  const onChange = (e: any) => {
    setSelectedCustomer({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeDate = (date: Date, name: string) => {
    const stringDate =
      date.getFullYear() +
      "" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

    setSelectedCustomer({
      ...data,
      [name]: stringDate,
    });

    setDates({ ...dates, [name]: date });
  };
  return (
    <Wrapper>
      {data ? (
        <form>
          <Row>
            <Col>
              <div className="form-group">
                <label>사원코드</label>
                <input
                  type="text"
                  id="swCode"
                  name="swCode"
                  value={data.swCode}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label>사원구분</label>
                <select
                  id="swGubun"
                  name="swGubun"
                  onChange={onChange}
                  value={data.swGubun}
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
                <input
                  type="text"
                  id="swName"
                  name="swName"
                  value={data.swName}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label>주민번호</label>
                <input
                  type="text"
                  id="swJuminno"
                  name="swJuminno"
                  value={data.swJuminno}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group">
                <label>전화번호</label>
                <input
                  type="text"
                  id="swTel"
                  name="swTel"
                  value={data.swTel}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label>핸드폰</label>
                <input
                  type="text"
                  id="swHp"
                  name="swHp"
                  value={data.swHp}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group">
                <label>주소</label>
                <input
                  type="text"
                  id="swAddr1"
                  name="swAddr1"
                  value={data.swAddr1}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label></label>
                <input
                  type="text"
                  id="swAddr2"
                  name="swAddr2"
                  value={data.swAddr2}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>

          <div className="divider"></div>

          <Row>
            <Col>
              <div className="form-group" style={{ position: "relative" }}>
                <label style={{ marginRight: "30px" }}>입사일자</label>
                <DatePicker
                  selected={dates.swIndate}
                  dateFormat="yyyy-MM-dd"
                  onChange={(date: Date) => onChangeDate(date, "swIndate")}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label>급여방식</label>
                <select
                  id="swPaytype"
                  name="swPaytype"
                  onChange={onChange}
                  value={data.swPaytype}
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
                <input
                  type="text"
                  id="swPaykum"
                  name="swPaykum"
                  value={data.swPaykum}
                  onChange={onChange}
                  // Limit
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label>급여일</label>
                <input
                  type="text"
                  id="swPaydate"
                  name="swPaydate"
                  value={data.swPaydate}
                  onChange={onChange}
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
                  name="swDriverType"
                  value={data.swDriverType}
                  onChange={onChange}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label>면허번호</label>
                <input
                  type="text"
                  id="swDriverNo"
                  name="swDriverNo"
                  value={data.swDriverNo}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group">
                <label style={{ marginRight: "30px" }}>적성검사</label>
                <DatePicker
                  selected={dates.swJdate1}
                  dateFormat="yyyy-MM-dd"
                  onChange={(date: Date) => onChangeDate(date, "swJdate1")}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label style={{ marginRight: "30px" }}>~</label>
                <DatePicker
                  selected={dates.swJdate2}
                  dateFormat="yyyy-MM-dd"
                  onChange={(date: Date) => onChangeDate(date, "swJdate2")}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group">
                <label>비고</label>
                <input
                  type="text"
                  id="swBigo"
                  name="swBigo"
                  value={data.swBigo}
                  onChange={onChange}
                />
              </div>
            </Col>
          </Row>

          <div className="divider"></div>

          <Row>
            <Col>
              <div className="form-group">
                <label>가불합계</label>
                <input
                  type="text"
                  id="blabla"
                  name="blabla"
                  value={0}
                  onChange={() => console.log("")}
                />
              </div>
            </Col>
          </Row>
        </form>
      ) : (
        <p>...Loading</p>
      )}
    </Wrapper>
  );
}

export default InfoDetail;
