import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "app/store";
import { useForm } from "react-hook-form";
import {
  WhiteClose,
  Plus,
  UserWhite,
  Update,
  Reset,
  TickInCircle,
} from "components/allSvgIcon";
import { Input, Select, Field, FormGroup, Label } from "components/form/style";
import { FOOT61, FOOTER } from "app/path";
import API from "app/axios";
import Grid from "./grid";
import { closeModal } from "app/state/modal/modalSlice";
import { add } from "app/state/modal/footerSlice";
import Button from "components/button/button";
import {
  ButtonColor,
  ButtonType,
  BadgeColor,
  BadgeSize,
} from "components/componentsType";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import Badge from "components/badge";

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
    .bottom__upper {
      width: 100%;
      height: 32px;
      background: #e8e8e8;
      border-top: 1px solid #707070;
      padding: 0 5px 0 20px;
    }

    .bottom__lower {
      height: 43px;
      width: 100%;
      background: #cde7eb;
      border-top: 1px solid #707070;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px 0 20px;

      .buttons {
        display: flex;
        align-items: center;
      }
    }
  }
`;
//ustgah----------------------------
const temp = {
  areaCode: "02",
  barcodeYn: "N",
  cuAddr1n2: " ",
  cuBigo1: null,
  cuBigo2: null,
  cuCmisu: "3,120",
  cuCode: "001-00002",
  cuGongdate: null,
  cuHdate: null,
  cuHdateT: "",
  cuHp: null,
  cuJmisu: "",
  cuNo: null,
  cuSaddr1: null,
  cuSangho: null,
  cuStae: "0",
  cuStaeName: "정상",
  cuSukumtype: " ",
  cuSukumtypeName: null,
  cuSwCode: null,
  cuSwName: null,
  cuTel: null,
  cuTel2: null,
  cuTongkum: "0",
  cuType: "8",
  cuTypeName: null,
  cuUsername: "102호",
  cuViewName: "하나빌 102호",
  jTransYn: "N",
  mTransYn: "N",
  tTransYn: "N",
};

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
  const [selected, setSelected] = useState<any>({});

  console.log("selected=====================>", selected);

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

  useEffect(() => {
    dispatch(add({ info: selected }));
  }, [selected]);

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

          <span
            style={{}}
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            <WhiteClose />
          </span>
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
        <div className="bottom__upper">
          <Badge
            title="사업정보"
            color={BadgeColor.orange}
            size={BadgeSize.size3}
          />
          <input type="text" value={selected?.cuNo ? selected.cuNo : ""} />
          <input
            type="text"
            value={selected?.cuSangho ? selected.cuSangho : ""}
          />
          <input
            type="text"
            value={selected?.cuSajang ? selected.cuSajang : ""}
          />
          <input
            type="text"
            value={selected?.cuSaddr1 ? selected.cuSaddr1 : ""}
          />
        </div>
        <div className="bottom__lower">
          <Button
            text="신규거래등록 (F12)"
            style={{ marginRight: "5px" }}
            icon={<Plus />}
            type="button"
            color={ButtonColor.WARNING}
          />
          <div className="buttons">
            <Button
              text="선택"
              style={{ marginRight: "5px" }}
              icon={<TickInCircle />}
              type="button"
              color={ButtonColor.SUCCESS}
            />
            <Button text="취소" icon={<Reset />} type="button" />
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}

export default Form;
