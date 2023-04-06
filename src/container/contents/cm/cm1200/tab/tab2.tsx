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

function Tab2({
  register,
  dataCommonDic,
  control,
}: {
  register: Function;
  dataCommonDic: any;
  control: any;
}) {
  const tableData = [
    {
      1: `1)`,
      2: (
        <EditableSelect
          list={dataCommonDic?.tankMakeCo1}
          register={register("tankMakeCo1")}
          textAlign={"left"}
          style={{ width: "110px", margin: "0 3px" }}
        />
      ),
      3: (
        <CSelect
          {...register("tankVol1")}
          width={InputSize.i80}
          textAlign="right"
          style={{ margin: "0 3px" }}
        >
          {dataCommonDic?.tankVol1?.map((obj: any, index: number) => (
            <option key={index} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </CSelect>
      ),
      4: (
        <Input register={register("tankMakeSno1")} inputSize={InputSize.i110} />
      ),
      5: (
        <Controller
          control={control}
          {...register("tankMakeDate1")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
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
          {...register("tankFirstDate1")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              style={{ width: "110px" }}
            />
          )}
        />
      ),
      8: (
        <Controller
          control={control}
          {...register("tankOutsideDate1")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              style={{ width: "110px" }}
            />
          )}
        />
      ),
      9: (
        <Controller
          control={control}
          {...register("tankInsideDate1")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              style={{ width: "110px" }}
            />
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
          register={register("tankMakeCo2")}
          textAlign={"left"}
          style={{ width: "110px", margin: "0 3px" }}
        />
      ),
      3: (
        <CSelect
          {...register("tankVol2")}
          width={InputSize.i80}
          textAlign="right"
          style={{ margin: "0 3px" }}
        >
          {dataCommonDic?.tankVol2?.map((obj: any, index: number) => (
            <option key={index} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </CSelect>
      ),
      4: (
        <Input register={register("tankMakeSno2")} inputSize={InputSize.i110} />
      ),
      5: (
        <Controller
          control={control}
          {...register("tankMakeDate2")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
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
          {...register("tankFirstDate2")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              style={{ width: "110px" }}
            />
          )}
        />
      ),
      8: (
        <Controller
          control={control}
          {...register("tankOutsideDate2")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              style={{ width: "110px" }}
            />
          )}
        />
      ),
      9: (
        <Controller
          control={control}
          {...register("tankInsideDate2")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker
              value={value}
              onChange={onChange}
              name={name}
              style={{ width: "110px" }}
            />
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
    <div className="tab2">
      <Wrapper style={{ marginBottom: "5px" }}>
        <FormGroup>
          <Label style={{ minWidth: "94px" }}>공급시설구분</Label>
          {[
            { name: "벌크공급", value: "Y" },
            { name: "용기공급", value: "N" },
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
          <Label>완성검사일</Label>
          <Controller
            control={control}
            {...register("cuFinishDate")}
            render={({ field: { onChange, value, name } }) => (
              <CustomDatePicker
                value={value}
                onChange={onChange}
                name={name}
                style={{ width: "110px" }}
              />
            )}
          />
        </FormGroup>
        <FormGroup>
          <Label>정기검사일</Label>
          <Controller
            control={control}
            {...register("cuCircuitDate")}
            render={({ field: { onChange, value, name } }) => (
              <CustomDatePicker
                value={value}
                onChange={onChange}
                name={name}
                style={{ width: "110px" }}
              />
            )}
          />
        </FormGroup>
        <FormGroup>
          <Label>검사예정일</Label>
          <Controller
            control={control}
            {...register("cuScheduleDate")}
            render={({ field: { onChange, value, name } }) => (
              <CustomDatePicker
                value={value}
                onChange={onChange}
                name={name}
                style={{ width: "110px" }}
              />
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
        onClick={(item) => console.log("table", item)}
      />
    </div>
  );
}

export default Tab2;
