import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "app/store";
import { useForm } from "react-hook-form";
import { WhiteClose, UserWhite } from "components/allSvgIcon";
import { Input, Select, Field, FormGroup, Label } from "components/form/style";
import { FOOT61, FOOTER } from "app/path";
import API from "app/axios";
import Grid from "./grid";

import Button from "components/button/button";
import { ButtonType } from "components/componentsType";
import { MagnifyingGlassBig } from "components/allSvgIcon";

const FooterWrapper = styled.div`
  .top {
    width: 100%;
    height: 35px;
    background: #0098ff;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 17px 0 12px;

    .top__left {
      display: flex;
      align-items: center;

      p {
        font-family: "NotoSansKRRegular";
        padding: 0 5px;
      }

      p.b {
        color: #0a0a0a;
        font-size: 12px;
      }

      p.w {
        font-size: 14px;
        color: #fff;
      }
    }
  }

  .search-form {
    width: 100%;
    height: 70px;
    background: #cde7eb;
    padding: 0 6.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #707070;

    .form-group {
      display: flex;
      align-items: center;

      label {
        display: inline-block;
        font-size: 14px;
        color: #0a0a0a;
        width: 90px;
        // border: 1px solid red;
        text-align: end;
        padding-right: 5px;
      }
      input {
        height: 23px;
        width: 141px;
        border: 1px solid #707070;
        outline: none;
        padding: 0 5px;
      }
    }

    .search-form__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px 15px;
    }
  }
  .bottom {
    width: 100%;

    .bottom__upper {
      height: 32px;
      background: #e8e8e8;
      border-top: 1px solid #707070;
    }

    .bottom__lower {
      height: 43px;
      background: #cde7eb;
      border-top: 1px solid #707070;
    }
  }
`;

interface ISEARCH {
  areaCode: string;
  sCuCode: string;
  sCuName: string;
  sCuUsername: string;
  sCuTel: string;
  sCuNo: string;
  sCuAddr: string;
}

function Form() {
  const dispatch = useDispatch();
  const [areaCode, setAreaCode] = useState<
    Array<{ code: string; codeName: string }>
  >([]);

  const [data, setData] = useState();
  const [selected, setSelected] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    fetchAreaCode();
  }, []);

  useEffect(() => {
    if (areaCode.length > 0) {
      reset({ areaCode: areaCode[0].code });
    }
  }, [areaCode]);

  const fetchAreaCode = async () => {
    try {
      const { data } = await API.get(FOOT61);
      data?.areaCode && setAreaCode(data.areaCode);
    } catch (err) {
      console.log("err=========>", err);
    }
  };

  const fetchData = async (params: ISEARCH) => {
    try {
      const { data: SEARCHDATA } = await API.get(FOOTER, {
        params: params,
      });

      console.log("data==============>", data);

      setData(SEARCHDATA);
    } catch (error) {
      console.log("FOOTER DATA fetch error =======>", error);
    }
  };

  const submit = async (data: ISEARCH) => {
    fetchData(data);
  };

  return (
    <FooterWrapper>
      <form onSubmit={handleSubmit(submit)}>
        <div className="top">
          <div className="top__left">
            <UserWhite />
            <p className="w">거래처 검색</p>
            <p className="b">영업소</p>
            <Select {...register("areaCode")}>
              {areaCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </div>
          <WhiteClose />
        </div>
        <div className="search-form">
          <div className="search-form__grid">
            <div className="form-group">
              <label>거래처코드</label>
              <input type="text" {...register("sCuCode")} />
            </div>
            <div className="form-group">
              <label>거래처명,성명</label>
              <input type="text" {...register("sCuName")} />
            </div>
            <div className="form-group">
              <label>사용자명</label>
              <input type="text" {...register("sCuUsername")} />
            </div>

            <div className="form-group">
              <label>전화번호</label>
              <input type="text" {...register("sCuTel")} />
            </div>

            <div className="form-group">
              <label>사업자번호</label>
              <input type="text" {...register("sCuNo")} />
            </div>
            <div className="form-group">
              <label>주소 /비고</label>
              <input type="text" {...register("sCuAddr")} />
            </div>
          </div>
          <div>
            <Button
              text="검색"
              icon={<MagnifyingGlassBig width="17.188" height="17.141" />}
              kind={ButtonType.ROUND}
              type="submit"
              style={{ height: "26px" }}
            />
          </div>
        </div>
      </form>

      <Grid data={data} setSelected={setSelected} />
      <div className="bottom">
        <div className="bottom__upper"></div>
        <div className="bottom__lower"></div>
      </div>
    </FooterWrapper>
  );
}

export default Form;
