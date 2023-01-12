import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "components/button/button";
import CustomDatePicker from "components/customDatePicker";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import {
  Input,
  Select,
  Field,
  FormGroup,
  Wrapper,
  Label,
} from "components/form/style";
import { ResetGray, Update, Plus, Trash } from "components/allSvgIcon";
import { InputSize, ButtonColor } from "components/componentsType";
import { IDATA65 } from "./model";
import TabGrid from "./tabs/grid";
import { useDispatch } from "app/store";
import FooterInfo from "./footer";
import { CircleBtn } from "../gr1200/style";
import { PersonInfoText } from "components/text";

function Form({
  dataCommonDic,
  data65,
  data65Detail,
  selected,
}: {
  dataCommonDic: any;
  data65: any;
  data65Detail: any;
  selected: any;
}) {
  const dispatch = useDispatch();
  const [tabId, setTabId] = useState(0);
  const [isAddBtnClicked, setAddBtnClicked] = useState(false);
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const { register, handleSubmit, reset, control } = useForm<IDATA65>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (data65) {
      reset({
        areaCode: selected?.areaCode,
        bbDate: selected?.bbDate,
        bbBuCode: selected?.bbBuCode,
        bbSno: selected?.bbSno,
      });

      setTabId(data65?.bcChitType);
    }
    setAddBtnClicked(false);
  }, [data65]);

  const openPopup = () => {};

  const addRow = () => {};

  const deleteRow = () => {};

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <form>
        <Field
          flex
          style={{
            height: "35px",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 6px 0 15px",
            borderBottom: "1px solid #707070",
          }}
        >
          <Field flex style={{ alignItems: "center" }}>
            <PersonInfoText text="매입전표 등록" />
          </Field>
          <Field flex>
            <Button
              type="button"
              text="등록"
              icon={<Plus />}
              style={{ marginRight: "5px" }}
              onClick={() => {
                setAddBtnClicked(true);
              }}
            />
            <Button
              type="button"
              text="삭제"
              icon={<Trash />}
              style={{ marginRight: "5px" }}
              onClick={() => {
                setAddBtnClicked(false);
              }}
            />
            <Button
              type="button"
              text="저장"
              icon={<Update />}
              style={{ marginRight: "5px" }}
              color={ButtonColor.SUCCESS}
              onClick={() => {
                setAddBtnClicked(false);
              }}
            />
            <Button
              type="button"
              text="취소"
              icon={<ResetGray />}
              onClick={() => {
                setAddBtnClicked(false);
              }}
              color={ButtonColor.LIGHT}
            />
          </Field>
        </Field>
        <Wrapper grid>
          <Field flex style={{ alignItems: "center" }}>
            <Label>입고일자</Label>
            <Controller
              control={control}
              {...register("bbDate")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
        </Wrapper>
        <Wrapper grid>
          <FormGroup>
            <Label>매입처</Label>
            <Select {...register("bbBuCode")} width={InputSize.md}>
              {dataCommonDic?.sBuCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <Input
            label="매입 회차"
            register={register("bbSno")}
            inputSize={InputSize.i60}
            textAlign={"right"}
          />
        </Wrapper>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <PlainTab
            tabHeader={["부품 매입", "용기매입(공병)"]}
            //onClick={(id) => {
            //  isAddBtnClicked
            //    ? setTabId(id)
            //    : data?.bcChitType
            //    ? setTabId(data?.bcChitType)
            //    : setTabId(0);
            //}}

            onClick={(id) => {
              isAddBtnClicked
                ? setTabId(id)
                : data65?.bcChitType === null
                ? setTabId(0)
                : setTabId(0);
            }}
            tabId={tabId ? tabId : 0}
          />

          <CircleBtn onClick={addRow} style={{ marginRight: "5px" }}>
            +
          </CircleBtn>
          <CircleBtn onClick={deleteRow}>-</CircleBtn>
        </div>
        <TabContentWrapper
          style={{
            padding: "0",
            border: "none",
            borderTop: "1px solid #707070",
            boxShadow: "none",
            borderRadius: "0",
          }}
        >
          <TabGrid
            data={data65Detail}
            data65={data65}
            tabId={tabId ? tabId : 0}
            openPopup={openPopup}
            setRowIndex={setRowIndex}
          />
        </TabContentWrapper>
      </form>
      <FooterInfo data={data65} selected={selected} />
    </div>
  );
}

export default Form;
