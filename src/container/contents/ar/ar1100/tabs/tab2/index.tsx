import React, { useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import Table from "components/table";
import { Input, Select, FormGroup } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { Reset, MagnifyingGlass, Update } from "components/allSvgIcon";
import { IAR1100TAB2 } from "./model";
import {
  AR1100CJSALEINSERT,
  AR1100CJSALEUPDATE,
  AR1100CJSALEDELETE,
} from "app/path";
import { apiPost } from "app/axios";
import { useSelector } from "app/store";
import useModal from "app/hook/useModal";

const Tab2 = React.forwardRef(
  (
    {
      areaCode,
      data,
      dictionary,
      isAddBtnClicked,
      fetchData,
      selected,
      menuId,
      addBtnUnClick,
    }: {
      areaCode: string;
      data: any;
      dictionary: any;
      isAddBtnClicked: boolean;
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

    const cm1106 = useSelector((state: any) => state.modal.cm1106);
    const footerState = useSelector((state: any) => state.footer);

    const { showCM1106Modal, openModal } = useModal();

    useImperativeHandle<any, any>(ref, () => ({
      reset,
    }));

    const submit = async (params: any) => {
      const path = isAddBtnClicked ? AR1100CJSALEINSERT : AR1100CJSALEUPDATE;
      console.log("params>>>>", params);
      if (isAddBtnClicked) {
        if (footerState?.source === menuId) {
          params.areaCode = areaCode;
          params.pcJpCode = footerState?.info?.cuCode;
          params.pcJpName = footerState?.info?.cuName;
        }
      }

      // const res = await apiPost(path, params, "저장이 성공하였습니다");
      // if (res) {
      //   await fetchData();
      // }
    };

    const openPopupCM1106 = async () => {
      openModal();
    };

    const data1 = [
      {
        1: (
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
        2: (
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
              onClick={isAddBtnClicked ? openPopupCM1106 : undefined}
            >
              <MagnifyingGlass />
            </span>
          </FormGroup>
        ),
        3: (
          <Controller
            control={control}
            name="pcQty"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        4: (
          <Controller
            control={control}
            name="pcReqty"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        5: (
          <Controller
            control={control}
            name="pcJaego"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        6: (
          <Controller
            control={control}
            name="pcDanga"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        7: (
          <Controller
            control={control}
            name="pcKumack"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        8: (
          <Controller
            control={control}
            name="pcGum"
            render={({ field }) => (
              <Input {...field} inputSize={InputSize.i100} textAlign="right" />
            )}
          />
        ),
        9: (
          <Controller
            control={control}
            name="pcSwName"
            render={({ field }) => (
              <Select {...field} width={InputSize.i100}>
                {dictionary?.sSawon?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            )}
          />
        ),
        10: <Input register={register("pcBigo")} inputSize={InputSize.i100} />,
      },
    ];

    const data2 = [
      {
        1: (
          <FormGroup>
            <Controller
              control={control}
              name="cSaleType"
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
            name="cProxyType"
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
        3: (
          <FormGroup style={{ position: "relative" }}>
            <Input register={register("cBuCode")} inputSize={InputSize.i100} />
            <Controller
              control={control}
              name="cBuName"
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
      <>
        {showCM1106Modal()}
        <form autoComplete="off" onSubmit={handleSubmit(submit)}>
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <div className="tab1">
              <Table
                className="no-space"
                tableHeader={[
                  "공급일자",
                  "품  명",
                  "공급량",
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
                tableHeader={["거래상태", "공급구분", "매입처"]}
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
      </>
    );
  }
);

export default Tab2;
