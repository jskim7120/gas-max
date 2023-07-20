import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CC1100SEARCH } from "app/path";
import { ICC9002SEARCH } from "./model";
import GridLeft from "components/grid";
import CheckBox from "components/checkbox";
import { MainWrapper, SearchWrapper, LeftSide } from "../../commonStyle";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label, Field } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { columns, fields } from "./data";

function CC9002({
  depthFullName,
  areaCode,
  menuId,
}: {
  depthFullName: string;
  areaCode: string;
  menuId: string;
}) {
  const {
    data,
    setData,
    selected,
    setSelected,
    loading,
    fetchData,
    dispatch,
    dataCommonDic,
  } = CreateReport("CC", "CC9002", menuId, CC1100SEARCH);

  const { register, handleSubmit, reset, control } = useForm<ICC9002SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic && dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  const submit = (data: ICC9002SEARCH) => {
    fetchData(data);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init: any = dataCommonDic.dataInit[0];
    }
  };

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
    setData([]);
  };

  return (
    <>
      <SearchWrapper className="h35">
        <FormGroup></FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide style={{ border: "none" }}>
          <form onSubmit={handleSubmit(submit)} autoComplete="off">
            <SearchWrapper className="h35" style={{ justifyContent: "start" }}>
              <FormGroup>
                <Label style={{ minWidth: "36px" }}>기간</Label>
                <Controller
                  control={control}
                  {...register("sDateF")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
                <p>~</p>
                <Controller
                  control={control}
                  {...register("sDateT")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
              </FormGroup>
              <Field style={{ width: "83px", marginLeft: "63px" }}>
                <FormGroup>
                  <CheckBox register={{ ...register("userChk") }} />
                  <Label style={{ minWidth: "64px" }}>계정 과목</Label>
                </FormGroup>
              </Field>
              <FormGroup>
                <Select
                  register={register("acjAccCodeF")}
                  width={InputSize.i120}
                >
                  {dataCommonDic?.acjAccCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
                <p>~</p>
                <Select
                  register={register("acjAccCodeT")}
                  width={InputSize.i120}
                >
                  {dataCommonDic?.acjAccCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <div className="buttons">
                <Button
                  text="검색"
                  icon={!loading && <MagnifyingGlass />}
                  color={ButtonColor.DANGER}
                  type="submit"
                  loader={
                    loading && (
                      <>
                        <Loader
                          color="white"
                          size={13}
                          borderWidth="2px"
                          style={{ marginRight: "10px" }}
                        />
                      </>
                    )
                  }
                  style={{ margin: " 0 5px 0 170px" }}
                />
                <Button
                  text="취소"
                  icon={<ResetGray />}
                  type="button"
                  color={ButtonColor.LIGHT}
                  onClick={handleReset}
                />
              </div>
            </SearchWrapper>
          </form>
          <GridLeft
            areaCode="00"
            data={data}
            setSelected={setSelected}
            fields={fields}
            columns={columns}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `calc(100% - 47px)` }}
          />
        </LeftSide>
      </MainWrapper>
    </>
  );
}

export default CC9002;
