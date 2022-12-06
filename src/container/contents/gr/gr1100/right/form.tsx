import { useState, useEffect } from "react";
import {
  Input,
  Divider,
  Wrapper,
  FormGroup,
  Label,
  Select,
  ErrorText,
  Field,
} from "components/form/style";
import { useForm } from "react-hook-form";
import DaumAddress from "components/daum";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import Button from "components/button/button";
import InfoPerson from "assets/image/infoPerson.png";
import { ButtonColor, ButtonType } from "components/componentsType";
import { InfoText } from "components/text";
// import getTabContent from "./getTabContent";
import API from "app/axios";
import { toast } from "react-toastify";
import { GR110065, GR1100UPDATE } from "app/path";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { IGR1100SEARCH } from "../model";
import Tab1 from "./table";

const radioOptions = [
  {
    label: "충전소",
    id: "0",
  },
  {
    label: "기구상",
    id: "1",
  },
  {
    label: "기타",
    id: "2",
  },
];

function Form({
  selected,
  fetchLeftData,
  dataCommonDic,
}: {
  selected: any;
  fetchLeftData: any;
  dataCommonDic: any;
}) {
  const [tabData, setTabData] = useState(null);
  const [addr, setAddress] = useState<string>("");

  const {
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IGR1100SEARCH>();

  const fetchData = async () => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      try {
        const { data: tabData } = await API.get(GR110065, {
          params: {
            areaCode: selected.areaCode,
            // buCode: selected?.buCode,
          },
        });

        setTabData(tabData);
      } catch (err) {}
    }
  };

  useEffect(() => {
    fetchData();
    clearForm("reset");
  }, [selected]);

  useEffect(() => {
    if (addr.length > 0) {
      reset({
        buZipcode: addr ? addr?.split("/")[1] : "",
        buAddr1: addr ? addr?.split("/")[0] : "",
      });
    }
  }, [addr]);

  const update = async () => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      try {
        const formValues = getValues();

        const response: any = await API.post(GR1100UPDATE, {
          areaCode: formValues.areaCode,
          buCode: formValues.buCode,
          buPdanga:
            formValues.buPdanga && Number(formValues.buPdanga.replace(",", "")),
          buBdanga:
            formValues.buBdanga && Number(formValues.buBdanga.replace(",", "")),
          buBldanga:
            formValues.buBldanga &&
            Number(formValues.buBldanga.replace(",", "")),
          buPcost:
            formValues.buPcost && Number(formValues.buPcost.replace(",", "")),
          buBcost:
            formValues.buBcost && Number(formValues.buBcost.replace(",", "")),
          buBlcost:
            formValues.buBlcost && Number(formValues.buBlcost.replace(",", "")),
          buJpCode1: formValues.buJpCode1,
          buJpCode2: formValues.buJpCode2,
          buJpCode3: formValues.buJpCode3,
          buJpCode4: formValues.buJpCode4,
        });

        if (response.status === 200) {
          fetchLeftData();
          toast.success("update successfull", {
            autoClose: 500,
          });
        } else {
          toast.error(response?.response?.data?.message, { autoClose: 500 });
        }
      } catch (err) {
        console.log("error::::::::", err);
      }
    }
  };

  const clearForm = (type: string) => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      let newData: any = {};
      if (type === "clear") {
        for (const [key, value] of Object.entries(selected)) {
          newData[key] = null;
        }
        reset(newData);
      } else if (type === "reset") {
        for (const [key, value] of Object.entries(selected)) {
          newData[key] = value;
        }

        reset({
          ...newData,
        });
      }
    }
  };
  return (
    <div style={{ padding: "0px 10px" }}>
      <form>
        <div className="buttons">
          <Button
            text="등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            onClick={() => {
              // formRef.current.setIsAddBtnClicked(true);
              // formRef.current.resetForm("clear");
            }}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            style={{ marginRight: "5px" }}
            onClick={() => {
              // dispatch(openModal({ type: "delModal" }));
              // dispatch(addDeleteMenuId({ menuId: menuId }));
            }}
          />
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={() => {
              // formRef.current.crud(null);
            }}
          />
          <Button
            text="취소"
            icon={<Reset />}
            // onClick={() => {
            //   formRef.current.setIsAddBtnClicked(false);
            //   formRef.current.resetForm("reset");
            // }}
            onClick={() => {
              clearForm("reset");
            }}
          />
        </div>
        <Field flex style={{ marginBottom: "6px", marginTop: "7px" }}>
          <img src={InfoPerson} alt="info" />
          <p style={{ fontSize: "14px", marginLeft: "7px" }}>매입처 정보</p>
        </Field>
        <Divider />
        <Wrapper grid>
          <Input
            label="매입처코드"
            register={register("buCode")}
            errors={errors["buCode"]?.message}
          />
          <FormGroup style={{ alignItems: "center" }}>
            <Label style={{ marginRight: "16px" }}>매입처 구분</Label>
            {radioOptions.map((option, index) => (
              <Item
                key={index}
                style={{ paddingLeft: "11px", marginRight: "16px" }}
              >
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(`buGubun`, {
                    required: "required",
                  })}
                  id={option.id}
                  // onChange={() => console.log(option.label)}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>
          <div>
            <ErrorText>{errors["buGubun"]?.message}</ErrorText>
          </div>
        </Wrapper>

        <Wrapper grid>
          <Input
            label="매입처명"
            register={register("buName")}
            errors={errors["buName"]?.message}
          />
          <FormGroup>
            <Label>거래상태</Label>
            <Select {...register("buStae")}>
              {dataCommonDic?.buStae?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>

        <Wrapper grid>
          <Input
            label="대표전화"
            register={register("buTel")}
            errors={errors["buTel"]?.message}
          />
          <Input
            label="Fax 번호"
            register={register("buFax")}
            errors={errors["buFax"]?.message}
          />
        </Wrapper>

        <Wrapper grid>
          <Input
            label="비고"
            register={register("buBigo")}
            errors={errors["buBigo"]?.message}
          />
        </Wrapper>
        <Divider />
        <Wrapper grid>
          <Input
            label="사업자번호"
            register={register("buNo")}
            errors={errors["buNo"]?.message}
          />
          <Input
            label="종사업장"
            register={register("buRCode")}
            errors={errors["buRCode"]?.message}
          />
        </Wrapper>
        <Wrapper grid>
          <Input
            label="상호"
            register={register("buSangho")}
            errors={errors["buSangho"]?.message}
          />
          <Input
            label="대표자명"
            register={register("buSajang")}
            errors={errors["buSajang"]?.message}
          />
        </Wrapper>
        <Divider />
        <Wrapper style={{ alignItems: "center" }}>
          <Input
            label="주소"
            register={register("buZipcode")}
            errors={errors["buZipcode"]?.message}
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            register={register("buAddr1")}
            errors={errors["buAddr1"]?.message}
          />
          <Input
            register={register("buAddr2")}
            errors={errors["buAddr2"]?.message}
          />
        </Wrapper>
        <Wrapper grid>
          <Input
            label="업태"
            register={register("buUptae")}
            errors={errors["buUptae"]?.message}
          />
          <Input
            label="종목"
            register={register("buJongmok")}
            errors={errors["buJongmok"]?.message}
          />
        </Wrapper>
        <Wrapper grid>
          <Input
            label="담당자명"
            register={register("buDamdang")}
            errors={errors["buDamdang"]?.message}
          />
          <Input
            label="담당자 번호"
            register={register("buHp")}
            errors={errors["buHp"]?.message}
          />
        </Wrapper>
        <Wrapper grid>
          <Input
            label="이메일"
            register={register("buEmail")}
            errors={errors["buEmail"]?.message}
          />
          <Input
            register={register("mailKind")}
            errors={errors["mailKind"]?.message}
          />
        </Wrapper>
        <Divider />
        <Wrapper grid>
          <Input
            label="결재은행"
            register={register("buBank")}
            errors={errors["buBank"]?.message}
          />
          <Input
            label="계좌번호"
            register={register("buBankno")}
            errors={errors["buBankno"]?.message}
          />
        </Wrapper>
        <Wrapper grid>
          <Input
            label="예금주"
            register={register("buBankju")}
            errors={errors["buBankju"]?.message}
          />
          <Input
            label="미지급액"
            register={register("buMisu")}
            errors={errors["buMisu"]?.message}
          />
        </Wrapper>
        <Divider />
        <Tab1
          register={register}
          errors={errors}
          tabData={tabData}
          selected={selected}
        />
      </form>
    </div>
  );
}

export default Form;
