import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CC1100SEARCH } from "app/path";
import { ICC9004SEARCH } from "./model";
import BasicGrid from "components/basicGrid";
import { SearchWrapper } from "../../commonStyle";
import { MagnifyingGlassBig, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { DateWithoutDash, GetYear, GetMonth } from "helpers/dateFormat";
import { columns, fields, layout } from "./data";

function CC9004({
  depthFullName,
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
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
  } = CreateReport("CC", "CC9004", menuId, CC1100SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const [toggler, setToggler] = useState<boolean>(true);

  const { register, handleSubmit, reset, control, watch } =
    useForm<ICC9004SEARCH>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (dataCommonDic && dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (watch("sMonth")) {
      handleSMonthChange(watch("sMonth"));
      setToggler((prev) => !prev);
    }
  }, [watch("sMonth")]);

  const handleSMonthChange = (sMonth: any) => {
    let year = GetYear(sMonth);
    const month = GetMonth(sMonth);
    let tempMonth;
    let tempYear = year;

    for (let i = 0; i < 2; i++) {
      tempMonth = +month - i;
      if (tempMonth === 0) {
        tempMonth = 12;
        tempYear = +year - 1;
      }
      (layout[1 + i] as any).header.text = `당월${tempYear}-${tempMonth}`;
    }
  };

  const submit = (data: ICC9004SEARCH) => {
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
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35">
          <FormGroup></FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>
        <SearchWrapper>
          <FormGroup>
            <Label style={{ minWidth: "70px" }}>월차</Label>
            <Controller
              control={control}
              name="sMonth"
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  style={{ width: "120px" }}
                  showMonthYearPicker
                />
              )}
            />

            <Label style={{ minWidth: "80px" }}>영업소</Label>
            <Select register={register("areaCode")} width={InputSize.i120}>
              {dataCommonDic?.acjAccCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <div className="buttons ml30">
              <Button
                text="검색"
                icon={!loading && <MagnifyingGlassBig width="15" />}
                color={ButtonColor.DANGER}
                type="submit"
                loader={
                  loading && (
                    <Loader
                      size={16}
                      style={{
                        marginRight: "12px",
                      }}
                    />
                  )
                }
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={handleReset}
              />
            </div>
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        ref={gridRef}
        areaCode={ownAreaCode}
        data={data}
        fields={fields}
        columns={columns}
        menuId={menuId}
        rowIndex={0}
        style={{ height: `calc(100% - 84px)` }}
        layout={layout}
        gridChangeField={toggler}
      />
    </>
  );
}

export default CC9004;
