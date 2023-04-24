import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "app/store";
import { useForm } from "react-hook-form";
import {
  WhiteClose,
  Plus,
  UserWhite,
  Reset,
  TickInCircle,
} from "components/allSvgIcon";
import { Select } from "components/form/style";
import { FOOT61, FOOTER } from "app/path";
import Loader from "components/loader";
import API from "app/axios";
import Grid from "./grid";
import { closeModal } from "app/state/modal/modalSlice";
import { addInfo } from "app/state/footer/footerSlice";
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
        font-size: 14px;
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
      display: flex;
      align-items: center;

      width: 100%;
      height: 32px;
      background: #e8e8e8;
      border-top: 1px solid #707070;
      padding: 0 5px 0 10px;

      span.info {
        height: 21px;
        width: 208px;
        margin-left: 5px;
        border: 1px solid #707070;
        border-radius: 4px;
        background: #fff;
        padding: 0 5px;
        display: flex;
        overflow: hidden;

        p {
          font-size: 14px;
          &:first-child {
            margin-right: 10px;
          }
        }
      }
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
  const [sCuCode, setSCuCode] = useState("");
  const [sCuAddr, setSCuAddr] = useState("");
  const [sCuTel, setSCuTel] = useState("");
  const [sCuName, setSCuName] = useState("");
  const [loading, setLoading] = useState(false);

  const searchState = useSelector((state) => state.footer.search);

  useEffect(() => {
    fetchAreaCode();
  }, []);

  useEffect(() => {
    if (searchState !== undefined && JSON.stringify(searchState) !== "{}") {
      searchState.fieldName === "sCuAddr" && setSCuAddr(searchState.text);
      searchState.fieldName === "sCuTel" && setSCuTel(searchState.text);
      searchState.fieldName === "sCuCode" && setSCuCode(searchState.text);
      searchState.fieldName === "sCuName" && setSCuName(searchState.text);
    }
  }, [searchState]);

  const { register, handleSubmit, reset } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (areaCode.length > 0) {
      reset({ areaCode: areaCode[0].code });
      if (
        searchState !== undefined &&
        JSON.stringify(searchState) !== "{}" &&
        searchState.text !== ""
      ) {
        fetchData({
          areaCode: areaCode[0].code,
          sCuCode: sCuCode,
          sCuName: sCuName,
          sCuUsername: "",
          sCuTel: sCuTel,
          sCuNo: "",
          sCuAddr: sCuAddr,
        });
      }
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
      setLoading(true);
      const { data: SEARCHDATA } = await API.get(FOOTER, {
        params: params,
      });

      setData(SEARCHDATA);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("FOOTER DATA fetch error =======>", error);
    }
  };

  const handleChoose = () => {
    if (JSON.stringify(selected) !== "{}") {
      dispatch(addInfo({ info: selected }));
      dispatch(closeModal());
    } else {
      alert("please choose row from grid ");
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
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
            <Select register={register("areaCode")}>
              {areaCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </div>

          <span style={{}} onClick={handleCancel}>
            <WhiteClose />
          </span>
        </div>
        <div className="search-form">
          <div className="search-form__grid">
            <div className="form-group">
              <label>거래처코드</label>
              <input
                type="text"
                {...register("sCuCode")}
                value={sCuCode}
                onChange={(e: any) => setSCuCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>거래처명,성명</label>
              <input
                type="text"
                {...register("sCuName")}
                value={sCuName}
                onChange={(e: any) => setSCuName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>사용자명</label>
              <input type="text" {...register("sCuUsername")} />
            </div>

            <div className="form-group">
              <label>전화번호</label>
              <input
                type="text"
                {...register("sCuTel")}
                value={sCuTel}
                onChange={(e: any) => setSCuTel(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>사업자번호</label>
              <input type="text" {...register("sCuNo")} />
            </div>
            <div className="form-group">
              <label>주소 /비고</label>
              <input
                type="text"
                {...register("sCuAddr")}
                value={sCuAddr}
                onChange={(e: any) => setSCuAddr(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button
              text="검색"
              icon={
                !loading && (
                  <MagnifyingGlassBig width="17.188" height="17.141" />
                )
              }
              kind={ButtonType.ROUND}
              type="submit"
              style={{ height: "26px" }}
              loader={
                loading && (
                  <>
                    <Loader
                      color="white"
                      size={19}
                      style={{ marginRight: "10px" }}
                      borderWidth="3px"
                    />
                  </>
                )
              }
            />
          </div>
        </div>
      </form>

      <Grid data={data} setSelected={setSelected} />
      <div className="bottom">
        <div className="bottom__upper">
          <Badge
            title="사업 정보"
            color={BadgeColor.orange}
            size={BadgeSize.size3}
          />

          <span className="info">
            <p>사업번호:</p>
            <p>{selected.cuNo}</p>
          </span>
          <span className="info">
            <p>상호:</p>
            <p>{selected.cuSangho}</p>
          </span>
          <span className="info">
            <p>대표:</p>
            <p>{selected.cuSajang}</p>
          </span>
          <span className="info">
            <p>주소:</p>
            <p>{selected.cuSaddr1}</p>
          </span>
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
              onClick={handleChoose}
            />
            <Button
              text="취소"
              icon={<Reset />}
              type="button"
              onClick={handleCancel}
            />
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}

export default Form;
