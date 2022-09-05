import React from "react";
import { Wrapper } from "./style";

function InfoDetail({ data }: { data: any }) {
  console.log("datafdvdffdvfd:", data);
  return (
    <Wrapper>
      <form>
        <div className="form-group">
          <label>
            사원코드:
            <input
              type="text"
              id=""
              name="swCode"
              defaultValue={data.areaCode}
            />
          </label>
          <label>
            사원구분:{" "}
            <input
              type="text"
              id=""
              name="swGubun"
              defaultValue={data.swCode}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            사원명:
            <input type="text" id="" name="swName" defaultValue={data.swName} />
          </label>
          <label>
            주민번호:
            <input
              type="text"
              id=""
              name="swJuminno"
              defaultValue={data.swJuminno}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            전화번호:
            <input type="text" id="" name="swTel" defaultValue={data.swTel} />
          </label>
          <label>
            핸드폰:
            <input type="text" id="" name="swHp" defaultValue={data.swHp} />
          </label>
        </div>
        <div className="form-group">
          <label>
            주소1: 주소2:
            <input
              type="text"
              id=""
              name="swAddr1 swAddr2"
              defaultValue={data.swAddr1}
            />
          </label>
          <label>
            입사일자:
            <input
              type="text"
              id=""
              name="swIndate"
              defaultValue={data.swIndate}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            급여방식:
            <input
              type="text"
              id=""
              name="swPaytype"
              defaultValue={data.swPaytype}
            />
          </label>
          <label>
            급여액:
            <input
              type="text"
              id=""
              name="swPaykum"
              defaultValue={data.swPaykum}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            급여일:
            <input
              type="text"
              id=""
              name="swPaytdate"
              defaultValue={data.swPaytdate}
            />
          </label>
          <label>
            면허종류:
            <input
              type="text"
              id=""
              name="swDriverType"
              defaultValue={data.swDriverType}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            면허번호:
            <input
              type="text"
              id=""
              name="swDriveNo"
              defaultValue={data.swDriverNo}
            />
          </label>
          <label>
            적성검사 시작일: 적성검사 마감일:
            <input
              type="text"
              id=""
              name="swJdate1 swJdate2"
              defaultValue={data.swJdate1}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            비고:
            <input type="text" id="" name="swBigo" defaultValue={data.swBigo} />
          </label>
        </div>
        <div></div>
      </form>
    </Wrapper>
  );
}

export default InfoDetail;
