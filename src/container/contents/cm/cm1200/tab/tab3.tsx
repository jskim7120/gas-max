import React from "react";
import { Controller } from "react-hook-form";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  FormGroup,
  Input,
  Label,
  Select,
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
  reset,
  watch,
  dataCommonDic,
  control,
}: {
  register: Function;
  reset: Function;
  watch: any;
  dataCommonDic: any;
  control: any;
}) {
  const tableData: any = [
    {
      0: `1)`,
      1: (
        <EditableSelect
          list={dataCommonDic?.gasifyCo1}
          reset={reset}
          register={register("gasifyCo1")}
          watch={watch("gasifyCo1")}
          textAlign={"left"}
          style={{ width: "115px", margin: "0 3px " }}
        />
      ),
      2: (
        <Select
          register={register("gasifyVol1")}
          style={{ width: "115px", margin: "0 3px " }}
        >
          {dataCommonDic?.gasifyVol1?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      ),
      3: <Input register={register("gasifySno1")} />,
      4: (
        <Controller
          control={control}
          name="gasifyMakeDate1"
          render={({ field }) => (
            <CustomDatePicker {...field} showMonthYearPicker />
          )}
        />
      ),
      5: <Input register={register("gasifyPower1")} />,
      6: (
        <Controller
          control={control}
          name="gasifyCheckDate1"
          render={({ field }) => <CustomDatePicker {...field} />}
        />
      ),
    },
    {
      0: `2)`,
      1: (
        <EditableSelect
          list={dataCommonDic?.gasifyCo2}
          reset={reset}
          register={register("gasifyCo2")}
          watch={watch("gasifyCo2")}
          textAlign={"left"}
          style={{ width: "115px", margin: "0 3px " }}
        />
      ),
      2: (
        <Select
          register={register("gasifyVol2")}
          style={{ width: "115px", margin: "0 3px " }}
        >
          {dataCommonDic?.gasifyVol2?.map((obj: any, index: number) => (
            <option key={index} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      ),
      3: <Input register={register("gasifySno2")} />,
      4: (
        <Controller
          control={control}
          name="gasifyMakeDate2"
          render={({ field }) => (
            <CustomDatePicker {...field} showMonthYearPicker />
          )}
        />
      ),
      5: <Input register={register("gasifyPower2")} />,
      6: (
        <Controller
          control={control}
          name="gasifyCheckDate2"
          render={({ field }) => <CustomDatePicker {...field} />}
        />
      ),
    },
  ];
  return (
    <form autoComplete="off">
      <div className="tab3">
        <FormGroup>
          <Label style={{ minWidth: "65px" }}>용기시설</Label>
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
              <Select
                register={register("cuCylinderName")}
                width={InputSize.i100}
              >
                {dataCommonDic?.cuCylinderName?.map(
                  (obj: any, index: number) => (
                    <option key={index} value={obj.code}>
                      {obj.codeName}
                    </option>
                  )
                )}
              </Select>
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
              <Input
                register={register("cuTransmCd")}
                inputSize={InputSize.sm}
              />
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
        />
      </div>
    </form>
  );
}

export default Tab3;
