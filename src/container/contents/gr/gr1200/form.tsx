import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "components/button/button";
import CustomDatePicker from "components/customDatePicker/test-datepicker";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  Input,
  Select,
  Field,
  FormGroup,
  Wrapper,
  Label,
} from "components/form/style";
import PersonIconSvg from "assets/image/person-icon.svg";
import { ResetGray, Update, Plus, Trash } from "components/allSvgIcon";
import { InputSize, ButtonColor } from "components/componentsType";
import { IDATA65 } from "./model";
import TabGrid from "./tabs/grid";
import { openModal } from "app/state/modal/modalSlice";
import { useDispatch } from "app/store";
import FooterInfo from "./footer";
const radioOptions = [
  {
    label: "창고",
    id: "0",
  },
  {
    label: "차량",
    id: "1",
  },
];

function Form({
  dataCommonDic,
  data,
  data65Detail,
}: {
  dataCommonDic: any;
  data: any;
  data65Detail: any;
}) {
  const dispatch = useDispatch();
  const [tabId, setTabId] = useState(0);
  const { register, handleSubmit, reset, control } = useForm<IDATA65>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (data) {
      reset({
        areaCode: data.areaCode,
        bcDate: data.bcDate,
        bcDateno: data.bcDateno,
      });

      setTabId(data?.bcChitType);
    }
  }, [data]);

  const openPopup = () => {
    dispatch(openModal({ type: "gr1200Modal" }));
  };

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
            <h4>
              <img src={PersonIconSvg} />
              사용자 정보
            </h4>
            <p
              className="big"
              style={{
                marginLeft: "27px",
                marginRight: "7px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              영업소
            </p>
            <Input
              register={register("areaCode")}
              maxLength="2"
              // readOnly={isAddBtnClicked}
            />
          </Field>
          <Field flex>
            <Button
              text="등록"
              icon={<Plus />}
              style={{ marginRight: "5px" }}
              onClick={() => {}}
            />
            <Button
              text="삭제"
              icon={<Trash />}
              style={{ marginRight: "5px" }}
              onClick={() => {}}
            />
            <Button
              text="저장"
              icon={<Update />}
              style={{ marginRight: "5px" }}
              color={ButtonColor.SUCCESS}
              onClick={() => {}}
            />
            <Button
              text="취소"
              icon={<ResetGray />}
              onClick={() => {}}
              color={ButtonColor.LIGHT}
            />
          </Field>
        </Field>
        <Wrapper grid>
          <Field flex style={{ alignItems: "center" }}>
            <Label>입고일자</Label>
            <Controller
              control={control}
              {...register("bcDate")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>

          <Input
            label="충전 회차"
            register={register("bcDateno")}
            inputSize={InputSize.i50}
          />
        </Wrapper>
        <Wrapper grid>
          <FormGroup>
            <Label>매입처</Label>
            <Select {...register("bcBuCode")} width={InputSize.i100}>
              {dataCommonDic?.bcBuCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <Input label="전표번호" register={register("bcJunno")} />
        </Wrapper>
        <Wrapper grid>
          <FormGroup>
            <Label>수송방법</Label>
            <Select {...register("bcCtype")} width={InputSize.i100}>
              {dataCommonDic?.bcCtype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "auto" }}>수송기사</Label>
            <Select {...register("bcCsawon")} width={InputSize.i100}>
              {dataCommonDic?.bcCsawon?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>수송차량</Label>
            <Select {...register("bcCarno")} width={InputSize.i100}>
              {dataCommonDic?.bcCarno?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <Label>재고 입고처</Label>
            {radioOptions.map((option, index) => (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(`bcCaCode`)}
                  id={option.id}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
            <Label></Label>
            <Select {...register("bcCarno1")} width={InputSize.i100}>
              {dataCommonDic?.bcCarno1?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <PlainTab
          tabHeader={["LP가스 매입", "일반가스 매입", "벌크 매입"]}
          onClick={(id) => setTabId(id)}
        />
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
            data2={data}
            tabId={tabId}
            openPopup={openPopup}
          />
        </TabContentWrapper>
      </form>
      <FooterInfo data={data} register={register} />
    </div>
  );
}

export default Form;
