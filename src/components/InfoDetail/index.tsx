import React, { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import { Wrapper } from "./style";
import DatePicker from "react-datepicker";
import formatDate from "../../helpers/dateFormat";

function InfoDetail({
  data,
  setSelectedCustomer,
}: {
  data: any;
  setSelectedCustomer: Function;
}) {
  const [employee, setEmployee] = useState({}) as any;
  const [dates, setDates] = useState({}) as any;

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const swIndate = data.swIndate ? data.swIndate : "";
      const swJdate1 = data.swJdate1 ? data.swJdate1 : "";
      const swJdate2 = data.swJdate2 ? data.swJdate2 : "";
      const date = data.swIndate ? new Date(formatDate(data.swIndate)) : "";
      const date1 = data.swJdate1 ? new Date(formatDate(data.swJdate1)) : "";
      const date2 = data.swJdate2 ? new Date(formatDate(data.swJdate2)) : "";

      setDates({ date: date, date1: date1, date2: date2 });

      setEmployee({
        ...data,
        swIndate: swIndate,
        swJdate1: swJdate1,
        swJdate2: swJdate2,
      });
    }
  }, [data]);

  const onChange = (e: any) => {
    // const a = dates.swIndate;
    // const b = dates.swJdate1;
    // const c = dates.swJdate2;

    // const swIndate = dates.swIndate
    //   ? a.getFullYear() +
    //     "-" +
    //     (a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1) +
    //     "-" +
    //     a.getDate()
    //   : "-";

    // const swJdate1 = dates.swJdate1
    //   ? b.getFullYear() +
    //     "-" +
    //     (b.getMonth() + 1 < 10 ? "0" + (b.getMonth() + 1) : b.getMonth() + 1) +
    //     "-" +
    //     b.getDate()
    //   : "-";

    // const swJdate2 = dates.swJdate2
    //   ? c.getFullYear() +
    //     "-" +
    //     (c.getMonth() + 1 < 10 ? "0" + (c.getMonth() + 1) : c.getMonth() + 1) +
    //     "-" +
    //     c.getDate()
    //   : "-";

    console.log("eeee:", employee);
    setSelectedCustomer({
      ...employee,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <Wrapper>
      <form>
        <Row>
          <Col>
            <div className="form-group">
              <label>사원코드</label>
              <input
                type="text"
                id="swCode"
                value={employee?.swCode}
                onChange={onChange}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label>사원구분</label>

              <select
                name="swGubun"
                onChange={onChange}
                id="swGubun"
                value={employee?.swGubun}
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
                value={employee?.swName}
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
                value={employee.swJuminno}
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
                value={employee.swTel}
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
                value={employee.swHp}
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
                value={employee.swAddr1}
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
                value={employee.swAddr2}
                onChange={onChange}
              />
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
                selected={dates.date}
                dateFormat="yyyy-MM-dd"
                onChange={(date: Date) =>
                  setEmployee((employee: any) => ({
                    ...employee,
                    swIndate: date,
                  }))
                }
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label>급여방식</label>
              <select
                id="swPaytype"
                onChange={onChange}
                value={employee.swPaytype}
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
                value={employee.swPaykum}
                onChange={onChange}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label>급여일</label>
              <input
                type="text"
                id="swPaytdate"
                value={employee.swPaydate}
                // Limit
                onChange={onChange}
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
                value={employee.swDriverType}
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
                value={employee.swDriverNo}
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
                selected={dates.date1}
                dateFormat="yyyy-MM-dd"
                onChange={(date: Date) =>
                  setEmployee((employee: any) => ({
                    ...employee,
                    swJdate1: date,
                  }))
                }
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label style={{ marginRight: "30px" }}>~</label>
              <DatePicker
                selected={dates.date2}
                dateFormat="yyyy-MM-dd"
                onChange={(date: Date) =>
                  setEmployee((employee: any) => ({
                    ...employee,
                    swJdate2: date,
                  }))
                }
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
                value={employee.swBigo}
                onChange={onChange}
              />
            </div>
          </Col>
        </Row>
        <div className="divider"></div>
        {/* -------------------------------------------------------------------------- */}
        <Row>
          <Col>
            <div className="form-group">
              <label>가불합계</label>
              <input type="text" id="blabla" value={0} onChange={onChange} />
            </div>
          </Col>
        </Row>
      </form>
    </Wrapper>
  );
}

export default InfoDetail;
