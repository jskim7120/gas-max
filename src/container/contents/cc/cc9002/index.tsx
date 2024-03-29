import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import getSimpleData from "app/hook/getSimpleData";
import { CC1100SEARCH } from "app/path";
import { ICC9002SEARCH } from "./model";
import BasicGrid from "components/basicGrid";
import CheckBox from "components/checkbox";
import { SearchWrapper } from "../../commonStyle";
import { MagnifyingGlassBig, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { columns, fields } from "./data";

function CC9002({
  depthFullName,
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
  menuId: string;
}) {
  const { data, setData, loading, fetchData, dataCommonDic } = getSimpleData(
    "CC",
    "CC9002",
    CC1100SEARCH
  );

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
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35">
          <FormGroup></FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>

        <SearchWrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>기간</Label>
            <Controller
              control={control}
              name="sDateF"
              render={({ field }) => <CustomDatePicker {...field} />}
            />
            <p>~</p>
            <Controller
              control={control}
              name="sDateT"
              render={({ field }) => <CustomDatePicker {...field} />}
            />

            <CheckBox
              title="계정 과목"
              rtl
              register={register("userChk")}
              style={{ marginLeft: "50px" }}
            />

            <Select register={register("acjAccCodeF")} width={InputSize.i120}>
              {dataCommonDic?.acjAccCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <p>~</p>
            <Select register={register("acjAccCodeT")} width={InputSize.i120}>
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
        areaCode={ownAreaCode}
        data={data}
        fields={fields}
        columns={columns}
        menuId={menuId}
        rowIndex={0}
        style={{ height: `calc(100% - 84px)` }}
      />
    </>
  );
}

export default CC9002;
