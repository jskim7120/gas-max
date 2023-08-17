import React, { useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import Table from "components/table";
import { Input, Select, FormGroup } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { Reset, MagnifyingGlass, Update } from "components/allSvgIcon";
import { IAR1100TAB2 } from "./model";

const Tab2 = React.forwardRef(
  (
    {
      areaCode,
      data,
      dictionary,
      isAddBtnClicked,
      setIsAddBtnClicked,
      fetchData,
      selected,
      menuId,
      addBtnUnClick,
    }: {
      areaCode: string;
      data: any;
      dictionary: any;
      isAddBtnClicked: boolean;
      setIsAddBtnClicked: Function;
      fetchData: Function;
      selected: any;
      menuId: string;
      addBtnUnClick: Function;
    },
    ref: React.ForwardedRef<any>
  ) => {
    const { register, handleSubmit, reset, control, getValues, watch } =
      useForm<IAR1100TAB2>({
        mode: "onSubmit",
      });

    useImperativeHandle<any, any>(ref, () => ({
      reset,
    }));
    const submit = () => {};

    const data1 = [
      {
        1: (
          <FormGroup>
            <Controller
              control={control}
              name="saleState"
              render={({ field }) => (
                <Select {...field} width={InputSize.i100}>
                  {dictionary?.saleType?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormGroup>
        ),
        2: (
          <Controller
            control={control}
            name="pcDate"
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                readOnly={!isAddBtnClicked}
                style={{ margin: "1px 0 0 0" }}
              />
            )}
          />
        ),
        3: (
          <FormGroup style={{ position: "relative" }}>
            <Input
              register={register("pcJpCode")}
              inputSize={InputSize.i70}
              readOnly={!isAddBtnClicked}
            />
            <Controller
              control={control}
              name="pcJpName"
              render={({ field }) => (
                <Input {...field} readOnly={!isAddBtnClicked} />
              )}
            />

            <span
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#686767",
                position: "absolute",
                right: "6px",
                bottom: "6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "3px",
              }}
              // onClick={isAddBtnClicked ? openPopupCM1106 : undefined}
            >
              <MagnifyingGlass />
            </span>
          </FormGroup>
        ),
        4: (
          <Controller
            control={control}
            name="pcQty"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        5: (
          <Controller
            control={control}
            name="pcReqty"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        6: (
          <Controller
            control={control}
            name="junJaego"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        7: (
          <Controller
            control={control}
            name="nergui"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        8: (
          <Controller
            control={control}
            name="pcKumack"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        9: (
          <Controller
            control={control}
            name="pcGum"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        10: (
          <Controller
            control={control}
            name="pcSwName"
            render={({ field }) => (
              <Select {...field} width={InputSize.i100}>
                {dictionary?.saleType?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            )}
          />
        ),
        11: <Input register={register("pcBigo")} inputSize={InputSize.i100} />,
      },
    ];

    const data2 = [
      {
        1: (
          <Controller
            control={control}
            name="proxyType"
            render={({ field }) => (
              <Select {...field} width={InputSize.i100}>
                {dictionary?.sProxytype?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            )}
          />
        ),
        2: (
          <FormGroup style={{ position: "relative" }}>
            <Input register={register("buCode")} inputSize={InputSize.i100} />
            <Controller
              control={control}
              name="buName"
              render={({ field }) => (
                <Select {...field} width={InputSize.i100}>
                  {dictionary?.sProxytype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            />
            <span
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#686767",
                position: "absolute",
                right: "6px",
                bottom: "6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "3px",
              }}
              // onClick={isAddBtnClicked ? openPopupCM1106 : undefined}
            >
              <MagnifyingGlass />
            </span>
          </FormGroup>
        ),
      },
    ];

    return (
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div className="tab1">
            <Table
              className="no-space"
              tableHeader={[
                "",
                "공급일자",
                "품  명",
                "공급수량",
                "공병회수",
                "재고",
                "공급단가",
                "공급액",
                "배달검침",
                "사원",
                "비고",
              ]}
              tableData={data1}
              style={{ marginBottom: "2px" }}
            />
            <Table
              className="no-space"
              tableHeader={["공급구분", "매입처명", ""]}
              tableData={data2}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Button
              text="저장"
              icon={<Update />}
              color={ButtonColor.SECONDARY}
              onClick={() => {}}
              type="submit"
            />

            <Button
              text="취소"
              icon={<Reset />}
              type="button"
              onClick={() => {}}
            />
          </div>
        </div>
      </form>
    );
  }
);

export default Tab2;
