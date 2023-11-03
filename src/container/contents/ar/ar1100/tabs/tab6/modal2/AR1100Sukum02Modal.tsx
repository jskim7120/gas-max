import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "app/store";
import { apiGet, apiPost } from "app/axios";
import { AR1100MISU, AR1100SUKUMINSERT } from "app/path";
import Button from "components/button/button";
import { ModalBlueHeader } from "components/modal/customModals/style";
import { Reset, WhiteClose, Update } from "components/allSvgIcon";
import { Input, Select, FormGroup, CustomForm } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import EditableSelect from "components/editableSelect";
import { InfoText } from "components/text";
import Table from "components/table";
import { currencyMask, removeCommas } from "helpers/currency";
import { modalHeader1, modalHeader2 } from "../tableHeader";
import { AR1100MODELDETAIL, emtObjTab6 } from "../model";
import Grid from "./grid";
import { prepVal } from "../../../helper";
import {
  ModalBody,
  ModalFooterBtn,
  TabModalFooter,
  TabModalHeadWrap,
  LLabel,
  IInput,
  FFormGroup,
  TTSide,
  ArticleDiv,
} from "../../style";

function SukumModal2({
  setModalOpen,
  params,
}: {
  setModalOpen: Function;
  params: any;
}) {
  const { register, handleSubmit, reset, setFocus, control, watch, getValues } =
    useForm<AR1100MODELDETAIL>({
      mode: "onSubmit",
    });

  const dispatch = useDispatch();
  const [gridData, setGridData] = useState<Array<any>>([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const { info, source } = useSelector((state: any) => state.footer);

  useEffect(() => {
    if (source === "AR1100" && info?.cuCode && info?.areaCode) {
      fetchDataMisu();
    }
  }, [info]);

  useEffect(() => {
    if (params !== undefined) {
      if (params?.detailData) {
        reset(params?.detailData);
      }
    }
  }, [params]);

  useEffect(() => {
    if (watch("gsInkum") !== undefined) {
      handleChangeInkum(watch("gsInkum"));
    }
  }, [watch("gsInkum")]);

  useEffect(() => {
    if (watch("gsDc") !== undefined) {
      handleChangeDc(watch("gsDc"));
    }
  }, [watch("gsDc")]);

  const fetchDataMisu = async () => {
    const response = await apiGet(AR1100MISU, {
      areaCode: info?.areaCode,
      cuCode: info?.cuCode,
      misuCode: "C",
    });

    if (response && response?.detailData) {
      setGridData(response?.detailData);
      reset((formValues) => ({
        ...formValues,
        gsJmisuAmt: getSum(response?.detailData),
        test1: 0,
      }));
    } else {
      setGridData([]);
    }
  };

  const getSum = (detailData: []) => {
    let sum: number = 0;
    if (detailData?.length > 0) {
      detailData?.map((item: any) => {
        sum += item?.gjMisujan ? item?.gjMisujan : 0;
      });
    }
    return sum;
  };

  const getSumOfChecked = (arrOfChecked: Array<number>) => {
    let sum: number = 0;
    if (arrOfChecked?.length > 0) {
      arrOfChecked.map((item: number) => {
        sum += gridData[item]?.gjMisujan ? gridData[item]?.gjMisujan : 0;
      });
    }
    reset((formValues) => ({
      ...formValues,
      test1: sum,
    }));
  };

  const handleChangeInkum = (val: number) => {
    const tempMisuAmt = prepVal(getValues("gsJmisuAmt"));
    const tempTest1 = prepVal(getValues("test1"));
    const tempDc = prepVal(getValues("gsDc"));
    const tempInkum = prepVal(val) > tempTest1 ? tempTest1 : prepVal(val);
    const diff = tempDc + tempInkum - tempMisuAmt;

    const tempMisu: number = tempMisuAmt - prepVal(val) - tempDc;

    reset((formValues) => ({
      ...formValues,
      misu: tempMisu,
    }));

    if (prepVal(val) > tempTest1) {
      reset((formValues) => ({
        ...formValues,
        gsInkum: tempTest1,
      }));
    }

    // if (diff >= 0) {
    //   const newDc = tempDc - diff;
    //   reset((formValues) => ({
    //     ...formValues,
    //     gsDc: newDc,
    //   }));
    // }
  };

  const handleChangeDc = (val: number) => {
    const tempInkum = prepVal(getValues("gsInkum"));
    const tempMisuAmt = prepVal(getValues("gsJmisuAmt"));
    const tempSum = prepVal(val) + tempInkum;

    const diff = tempSum - tempMisuAmt;
    const tempMisu: number = tempMisuAmt - tempInkum - prepVal(val);

    reset((formValues) => ({
      ...formValues,
      misu: tempMisu,
    }));

    // if (diff > 0) {
    //   const newInkum = tempInkum - diff;
    //   if (newInkum >= 0) {
    //     reset((formValues) => ({
    //       ...formValues,
    //       gsInkum: newInkum,
    //     }));
    //   } else {
    //     reset((formValues) => ({
    //       ...formValues,
    //       gsInkum: 0,
    //       gsDc: tempMisuAmt,
    //     }));
    //   }
    // }
  };
  const submit = async (fparams: any) => {
    const path = AR1100SUKUMINSERT;

    let papList: Array<any> = [];
    if (selectedIndexes?.length > 0) {
      selectedIndexes?.map((item: number) => {
        papList.push({
          papSno: gridData[item]?.gjPapNo,
        });
      });
    }
    fparams.areaCode = info?.areaCode;
    fparams.gsJmisuAmt = +removeCommas(fparams.gsJmisuAmt, "number");
    fparams.test1 = +removeCommas(fparams.test1, "number");
    fparams.gsInkum = +removeCommas(fparams.gsInkum, "number");
    fparams.gsDc = +removeCommas(fparams.gsDc, "number");
    fparams.misu = +removeCommas(fparams.misu, "number");
    fparams.jsonItemList = papList;

    const res = await apiPost(path, fparams, "저장이 성공하였습니다");
    if (res) {
      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    }
  };

  const tableData1 = [
    {
      0: (
        <Controller
          control={control}
          name="gsDate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "110px" }} />
          )}
        />
      ),
      1: (
        <Controller
          control={control}
          name="gsDateUse"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "110px" }} />
          )}
        />
      ),
      2: (
        <FormGroup>
          <Select register={register("misuType")} width={InputSize.i80}>
            {params?.misuType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      3: (
        <Controller
          control={control}
          name="gsJmisuAmt"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i130}
              textAlign="right"
              mask={currencyMask}
              readOnly
            />
          )}
        />
      ),
      4: (
        <Controller
          control={control}
          name="test1"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i110}
              textAlign="right"
              mask={currencyMask}
              readOnly
            />
          )}
        />
      ),
      5: (
        <Controller
          control={control}
          name="gsInkum"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i110}
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
      6: (
        <Controller
          control={control}
          name="gsDc"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i110}
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
      7: (
        <Controller
          control={control}
          name="misu"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i130}
              textAlign="right"
              mask={currencyMask}
              readOnly
            />
          )}
        />
      ),
    },
  ];
  const tableData2 = [
    {
      8: (
        <FormGroup>
          <Select register={register("gsInkumtype")} width={InputSize.i110}>
            {params?.gsInkumtype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      9: (
        <FormGroup>
          <Select register={register("acbCode")} width={InputSize.i300}>
            {params?.acbCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      10: (
        <EditableSelect
          list={params?.asIn}
          reset={reset}
          register={register("gsBigo")}
          watch={watch("gsBigo")}
          textAlign={"left"}
          style={{ width: "398px" }}
        />
      ),
      11: (
        <FormGroup>
          <Select register={register("gsSwCode")} width={InputSize.i110}>
            {params?.gsSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
    },
  ];

  return (
    <>
      <ModalBlueHeader
        className="handle h25"
        style={{ background: "rgba(101, 84, 255, 0.37)", height: "40px" }}
      >
        <FormGroup>[ 체적미수 ] 선택수금처리</FormGroup>
        <FormGroup>
          <span
            className="close_btn"
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <WhiteClose />
          </span>
        </FormGroup>
      </ModalBlueHeader>
      <div>
        {/* Header */}
        <TabModalHeadWrap>
          <FFormGroup>
            <LLabel>거래구분</LLabel>
            <IInput
              readOnly
              value={info?.cuTypeName}
              style={{ width: "80px" }}
            />
          </FFormGroup>
          <FFormGroup>
            <LLabel>거래처 코드</LLabel>
            <IInput readOnly value={info?.cuCode} />
          </FFormGroup>
          <FFormGroup>
            <LLabel>거래처명</LLabel>
            <IInput readOnly value={info?.cuName} />
          </FFormGroup>
        </TabModalHeadWrap>

        {/* Content */}
        <ModalBody>
          <FormGroup style={{ marginTop: "3px", gap: "5px" }}>
            <TTSide>미납&nbsp;&nbsp;&nbsp;내역</TTSide>
            <Grid
              data={gridData}
              getSumOfChecked={getSumOfChecked}
              setSelectedIndexes={setSelectedIndexes}
            />
          </FormGroup>
          <FormGroup style={{ marginTop: "3px", gap: "5px" }}>
            <TTSide
              style={{
                height: "159px",
                background: "#eab2e2",
              }}
            >
              수납 정보
            </TTSide>
            {/* Table */}
            <ArticleDiv>
              <Table
                className="no-space"
                tableHeader={modalHeader1}
                tableData={tableData1}
                style={{ marginBottom: "3px" }}
              />
              <Table
                className="no-space"
                tableHeader={modalHeader2}
                tableData={tableData2}
              />
            </ArticleDiv>
          </FormGroup>
        </ModalBody>

        {/* Footer */}
        <TabModalFooter>
          <div style={{ color: "#359395" }}>
            <InfoText text="선택된 미수자료를 선입선출 방법을 수납처리 합니다." />
          </div>
          <ModalFooterBtn>
            <Button
              text="저장"
              icon={<Update />}
              color={ButtonColor.SECONDARY}
              type="button"
              onClick={handleSubmit(submit)}
            />
            <Button
              text="취소"
              icon={<Reset />}
              type="button"
              onClick={() => {
                setModalOpen(false);
              }}
            />
          </ModalFooterBtn>
        </TabModalFooter>
      </div>
    </>
  );
}

export default SukumModal2;
