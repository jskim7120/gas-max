import React from "react";
import { Controller } from "react-hook-form";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  Field,
  FormGroup,
  Input,
  Label,
  Select as CSelect,
  Wrapper,
} from "components/form/style";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import EditableSelect from "components/editableSelect";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";
import Table from "components/table";

function Tab3({
  register,
  dataCommonDic,
  control,
}: {
  register: Function;
  dataCommonDic: any;
  control: any;
}) {
  const tableData: any = [
    {
      0: `1)`,
      1: (
        <EditableSelect
          list={dataCommonDic?.gasifyCo1}
          register={register("gasifyCo1")}
          textAlign={"left"}
          style={{ width: "115px", margin: "0 3px " }}
        />
      ),
      2: (
        <CSelect
          {...register("gasifyVol1")}
          style={{ width: "115px", margin: "0 3px " }}
        >
          {dataCommonDic?.gasifyVol1?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </CSelect>
      ),
      3: <Input register={register("gasifySno1")} />,
      4: (
        <Controller
          control={control}
          {...register("gasifyMakeDate1")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              showYearDropdown
            />
          )}
        />
      ),
      5: <Input register={register("gasifyPower1")} />,
      6: (
        <Controller
          control={control}
          {...register("gasifyCheckDate1")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker value={value} onChange={onChange} name={name} />
          )}
        />
      ),
    },
    {
      0: `2)`,
      1: (
        <EditableSelect
          list={dataCommonDic?.gasifyCo2}
          register={register("gasifyCo2")}
          textAlign={"left"}
          style={{ width: "115px", margin: "0 3px " }}
        />
      ),
      2: (
        <CSelect
          {...register("gasifyVol2")}
          style={{ width: "115px", margin: "0 3px " }}
        >
          {dataCommonDic?.gasifyVol2?.map((obj: any, index: number) => (
            <option key={index} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </CSelect>
      ),
      3: <Input register={register("gasifySno2")} />,
      4: (
        <Controller
          control={control}
          {...register("gasifyMakeDate2")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              showYearDropdown
            />
          )}
        />
      ),
      5: <Input register={register("gasifyPower2")} />,
      6: (
        <Controller
          control={control}
          {...register("gasifyCheckDate2")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker value={value} onChange={onChange} name={name} />
          )}
        />
      ),
    },
  ];
  return (
    <div className="tab3">
      <FormGroup>
        <Label style={{ minWidth: "auto" }}>용기시설</Label>
        <Wrapper style={{ marginBottom: "5px" }}>
          <FormGroup>
            {[
              { name: "일반", value: "Y" },
              { name: "싸이폰", value: "N" },
            ].map((option, index) => {
              return (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={index}
                    {...register("cuCylinderType")}
                    id={option.value}
                  />
                  <RadioButtonLabel htmlFor={``}>
                    {option.name}
                  </RadioButtonLabel>
                </Item>
              );
            })}
          </FormGroup>

          <FormGroup>
            <Label style={{ minWidth: "80px" }}>용기수량</Label>
            <CSelect {...register("cuCylinderName")} width={InputSize.i100}>
              {dataCommonDic?.cuCylinderName?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </CSelect>
            <p>x</p>
            <Input
              register={register("cuCylinderQty")}
              inputSize={InputSize.xs}
            />
            <p>개</p>
          </FormGroup>
          <FormGroup>
            <Label style={{ minWidth: "200px" }}>
              발신기코드 / 절체고객코드
            </Label>
            <Input register={register("cuTransmCd")} inputSize={InputSize.sm} />
            <Input
              register={register("cuTransmCuCd")}
              inputSize={InputSize.sm}
            />
            <SearchBtn
              type="button"
              onClick={() => console.log("cuTransmCuCd")}
            >
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
        </Wrapper>
      </FormGroup>

      <Table
        className="no-space"
        tableHeader={[
          "기화기",
          "제조사",
          "용량(kg)",
          "제조번호",
          "제작년월",
          "전원",
          "장치검사",
        ]}
        style={{ overflowX: "visible" }}
        tableData={tableData}
        onClick={(item) => console.log("table", item)}
      />
    </div>
  );
}

export default Tab3;
