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

function Tab2({
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
  const tableData = [
    {
      1: `1)`,
      2: (
        <EditableSelect
          list={dataCommonDic?.tankMakeCo1}
          reset={reset}
          register={register("tankMakeCo1")}
          watch={watch("tankMakeCo1")}
          textAlign={"left"}
          style={{ width: "110px", margin: "0 3px" }}
        />
      ),
      3: (
        <Select
          register={register("tankVol1")}
          width={InputSize.i80}
          textAlign="right"
          style={{ margin: "0 3px" }}
        >
          {dataCommonDic?.tankVol1?.map((obj: any, index: number) => (
            <option key={index} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      ),
      4: (
        <Input register={register("tankMakeSno1")} inputSize={InputSize.i110} />
      ),
      5: (
        <Controller
          control={control}
          name="tankMakeDate1"
          render={({ field }) => (
            <CustomDatePicker
              {...field}
              showMonthYearPicker
              style={{ width: "110px" }}
            />
          )}
        />
      ),
      6: <Input register={register("tankRcv1")} inputSize={InputSize.i110} />,
      7: (
        <Controller
          control={control}
          name="tankFirstDate1"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "110px" }} />
          )}
        />
      ),
      8: (
        <Controller
          control={control}
          name="tankOutsideDate1"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "110px" }} />
          )}
        />
      ),
      9: (
        <Controller
          control={control}
          name="tankInsideDate1"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "110px" }} />
          )}
        />
      ),
      10: (
        <FormGroup style={{ marginLeft: "10px" }}>
          <Input
            register={register("tankMax1")}
            maxLength="3"
            textAlign="right"
            inputSize={InputSize.i40}
            placeholder=""
          />
          <p>%</p>
          <Input
            register={register("tankTransmCd1")}
            placeholder=""
            inputSize={InputSize.i60}
          />
          <Input
            register={register("tankCuCd1")}
            placeholder=""
            inputSize={InputSize.i60}
          />
          <SearchBtn type="button" onClick={() => console.log("cuZipCode")}>
            <MagnifyingGlass />
          </SearchBtn>
        </FormGroup>
      ),
    },
    {
      1: `2)`,
      2: (
        <EditableSelect
          list={dataCommonDic?.tankMakeCo2}
          reset={reset}
          register={register("tankMakeCo2")}
          watch={watch("tankMakeCo2")}
          textAlign={"left"}
          style={{ width: "110px", margin: "0 3px" }}
        />
      ),
      3: (
        <Select
          register={register("tankVol2")}
          width={InputSize.i80}
          textAlign="right"
          style={{ margin: "0 3px" }}
        >
          {dataCommonDic?.tankVol2?.map((obj: any, index: number) => (
            <option key={index} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      ),
      4: (
        <Input register={register("tankMakeSno2")} inputSize={InputSize.i110} />
      ),
      5: (
        <Controller
          control={control}
          name="tankMakeDate2"
          render={({ field }) => (
            <CustomDatePicker
              {...field}
              showMonthYearPicker
              style={{ width: "110px" }}
            />
          )}
        />
      ),
      6: <Input register={register("tankRcv2")} inputSize={InputSize.i110} />,
      7: (
        <Controller
          control={control}
          name="tankFirstDate2"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "110px" }} />
          )}
        />
      ),
      8: (
        <Controller
          control={control}
          name="tankOutsideDate2"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "110px" }} />
          )}
        />
      ),
      9: (
        <Controller
          control={control}
          name="tankInsideDate2"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "110px" }} />
          )}
        />
      ),
      10: (
        <FormGroup style={{ marginLeft: "10px" }}>
          <Input
            register={register("tankMax2")}
            placeholder=""
            inputSize={InputSize.i40}
            textAlign="right"
          />
          <p>%</p>
          <Input
            register={register("tankTransmCd2")}
            placeholder=""
            inputSize={InputSize.i60}
          />
          <Input
            register={register("tankCuCd2")}
            placeholder=""
            inputSize={InputSize.i60}
          />
          <SearchBtn type="button" onClick={() => console.log("cuZipCode")}>
            <MagnifyingGlass />
          </SearchBtn>
        </FormGroup>
      ),
    },
  ];
  return (
    <form autoComplete="off">
      <div className="tab2">
        <Wrapper style={{ marginBottom: "5px" }}>
          <FormGroup>
            <Label style={{ minWidth: "94px" }}>공급시설구분</Label>
            {[
              { name: "벌크 공급", value: "Y" },
              { name: "용기 공급", value: "N" },
            ].map((option, index) => {
              return (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={option.value}
                    {...register("cuTankYn")}
                    id={option.value}
                  />
                  <RadioButtonLabel htmlFor={`${option.value}`}>
                    {option.name}
                  </RadioButtonLabel>
                </Item>
              );
            })}
          </FormGroup>
          <FormGroup>
            <Label>완성 검사일</Label>
            <Controller
              control={control}
              name="cuFinishDate"
              render={({ field }) => (
                <CustomDatePicker {...field} style={{ width: "110px" }} />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label>정기 검사일</Label>
            <Controller
              control={control}
              name="cuCircuitDate"
              render={({ field }) => (
                <CustomDatePicker {...field} style={{ width: "110px" }} />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label>검사 예정일</Label>
            <Controller
              control={control}
              name="cuScheduleDate"
              render={({ field }) => (
                <CustomDatePicker {...field} style={{ width: "110px" }} />
              )}
            />
          </FormGroup>
        </Wrapper>

        <Table
          className="no-space"
          tableHeader={[
            "벌크 시설",
            "제조사",
            "용량(kg)",
            "제조번호",
            "제작년월",
            "대여처",
            "최초검사",
            "외관검사",
            "개방검사",
            "Max레벨 / 발신기코드 / 탱크고객코드",
          ]}
          style={{ overflowX: "visible" }}
          tableData={tableData}
        />
      </div>
    </form>
  );
}

export default Tab2;
