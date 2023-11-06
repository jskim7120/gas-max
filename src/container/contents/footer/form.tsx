import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { useDispatch, useSelector } from "app/store";
import { apiGet } from "app/axios";
import { FOOT61, FOOTER } from "app/path";
import { addCM1105SearchText, addCM1106 } from "app/state/modal/modalSlice";
import { addInfo } from "app/state/footer/footerSlice";
import {
  WhiteClose,
  Plus,
  UserWhite,
  Reset,
  TickInCircle,
  MagnifyingGlassBig,
} from "components/allSvgIcon";
import { FormGroup, Select, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, BadgeColor, BadgeSize } from "components/componentsType";
import Badge from "components/badge";
import Grid from "./grid";
import useModal from "app/hook/useModal";

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
            white-space: nowrap;
          }
          &:last-child {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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

const emtObj = {
  sCuCode: "",
  sCuName: "",
  sCuTel: "",
  sCuNo: "",
  sCuAddr: "",
  sCuUsername: "",
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

function Form({
  setIsOpen,
}: // onClose,
{
  setIsOpen: Function;
  // onClose: MouseEventHandler;
}) {
  const [areaCode, setAreaCode] = useState<
    Array<{ code: string; codeName: string }>
  >([]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const footerState = useSelector((state) => state.footer);

  const { register, handleSubmit, reset, getValues, control, setFocus } =
    useForm<ISEARCH>({
      mode: "onSubmit",
    });

  const { showCM1105Modal, openModal } = useModal();

  useEffect(() => {
    fetchAreaCode();
  }, []);

  useEffect(() => {
    if (footerState.source === "AR1100") {
      setFocus("sCuName");
    }
  }, [footerState.source]);

  useEffect(() => {
    if (areaCode !== undefined && areaCode?.length > 0) {
      if (footerState.search !== undefined && footerState.search?.length > 0) {
        reset({
          areaCode: areaCode[0].code,
          ...getParams(
            footerState.search[0].fieldName,
            footerState.search[0].text
          ),
        });
        if (footerState.search[0].text !== "") {
          fetchData({
            areaCode: areaCode[0].code,
            ...getParams(
              footerState.search[0].fieldName,
              footerState.search[0].text
            ),
          });
        }
      }
    }
  }, [areaCode]);

  const fetchAreaCode = async () => {
    const data = await apiGet(FOOT61);
    if (data && data?.areaCode) {
      setAreaCode(data.areaCode);
      reset((formValues) => ({
        ...formValues,
        areaCode: data.areaCode[0].code,
      }));
    } else {
      setAreaCode([]);
    }
  };

  const fetchData = async (params: any) => {
    setLoading(true);
    const res = await apiGet(FOOTER, params);
    if (res && res?.length > 0) {
      setData(res);
      setSelected(res[0]);
    } else {
      setData([]);
      setSelected({});
    }
    setLoading(false);
  };

  const getParams = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "sCuName":
        return { ...emtObj, sCuName: value };
      case "sCuCode":
        return { ...emtObj, sCuCode: value };
      case "sCuTel":
        return { ...emtObj, sCuTel: value };
      case "sCuAddr":
        return { ...emtObj, sCuAddr: value };
      default:
        return { ...emtObj, sCuName: value };
    }
  };

  const handleChoose = (obj: any, isClose: boolean = false) => {
    if (obj && Object.keys(obj)?.length > 0) {
      dispatch(addInfo({ info: obj }));

      footerState.source === "AR1100" &&
        dispatch(
          addCM1106({
            areaCode: obj?.areaCode,
            cuCode: obj?.cuCode,
            source: footerState.source,
          })
        );

      isClose && setIsOpen(false);
    } else {
      alert("please choose row from table ");
    }
  };

  const handleCancel = () => {
    dispatch(addInfo({ info: {} }));
    setIsOpen(false);
  };

  const submit = async (params: ISEARCH) => {
    // const arr = [];
    // if (getValues("sCuAddr") && getValues("sCuAddr") !== "") {
    //   arr.push({
    //     fieldName: "sCuAddr",
    //     text: getValues("sCuAddr"),
    //   });
    // }

    // if (getValues("sCuCode") && getValues("sCuCode") !== "") {
    //   arr.push({
    //     fieldName: "sCuCode",
    //     text: getValues("sCuCode"),
    //   });
    // }

    // if (getValues("sCuName") && getValues("sCuName") !== "") {
    //   arr.push({
    //     fieldName: "sCuName",
    //     text: getValues("sCuName"),
    //   });
    // }

    // if (getValues("sCuNo") && getValues("sCuNo") !== "") {
    //   arr.push({
    //     fieldName: "sCuNo",
    //     text: getValues("sCuNo"),
    //   });
    // }

    // if (getValues("sCuTel") && getValues("sCuTel") !== "") {
    //   arr.push({
    //     fieldName: "sCuTel",
    //     text: getValues("sCuTel"),
    //   });
    // }

    // if (getValues("sCuUsername") && getValues("sCuUsername") !== "") {
    //   arr.push({
    //     fieldName: "sCuUsername",
    //     text: getValues("sCuUsername"),
    //   });
    // }

    // dispatch(addSearchText({ search: arr }));

    fetchData({ ...params, areaCode: getValues("areaCode") });
  };

  const handleClickCustomerModalBtn = () => {
    if (getValues("sCuName") && getValues("sCuName") !== "") {
      dispatch(
        addCM1105SearchText({
          source: "AR1100",
          areaCode: getValues("areaCode"),
          search: {
            fieldname: "sCuName",
            text: getValues("sCuName"),
          },
        })
      );
    }
    openModal();
  };

  return (
    <FooterWrapper>
      {showCM1105Modal()}
      <form onSubmit={handleSubmit(submit)}>
        <div className="top handle">
          <div className="top__left">
            <UserWhite />
            <FormGroup>
              <Label style={{ minWidth: "63px", color: "white" }} className="b">
                영업소
              </Label>

              <Select register={register("areaCode")}>
                {areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </div>

          <FormGroup>
            <p className="w" style={{ marginRight: "20px", color: "white" }}>
              거래처 검색
            </p>
            <span style={{}} onClick={handleCancel}>
              <WhiteClose />
            </span>
          </FormGroup>
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
              icon={!loading && <MagnifyingGlassBig width="15" />}
              color={ButtonColor.DANGER}
              type="submit"
              loader={
                loading && <Loader size={16} style={{ marginRight: "12px" }} />
              }
            />
          </div>
        </div>
      </form>

      <Grid
        data={data}
        setSelected={setSelected}
        rowIndex={0}
        handleChoose={handleChoose}
      />
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
          {footerState.source === "AR1100" ? (
            <Button
              text="신규거래등록 (F12)"
              style={{ marginRight: "5px" }}
              icon={<Plus />}
              type="button"
              color={ButtonColor.WARNING}
              onClick={handleClickCustomerModalBtn}
            />
          ) : (
            <div></div>
          )}

          <div className="buttons">
            <Button
              text="선택"
              style={{ marginRight: "5px" }}
              icon={<TickInCircle />}
              type="button"
              color={ButtonColor.SUCCESS}
              onClick={() => handleChoose(selected, true)}
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
