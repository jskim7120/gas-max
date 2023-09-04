import React, { useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Reset, Update } from "components/allSvgIcon";
import { IAR1100TAB3 } from "./model";
import Table1 from "./table1";
import Table2 from "./table2";
import Table3 from "./table3";
import Table4 from "./table4";
import Table5 from "./table5";

const Tab1 = React.forwardRef(
  (
    {
      tabId,
      areaCode,
      data,
      setData,
      data65,
      dictionary,
      isAddBtnClicked,
      fetchData,
      selected,
      menuId,
      addBtnUnClick,
    }: {
      tabId: number;
      areaCode: string;
      data: any;
      setData: Function;
      data65: any;
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
      useForm<IAR1100TAB3>({
        mode: "onSubmit",
      });

    useEffect(() => {
      if (data65 && Object.keys(data65)?.length > 0) {
        resetForm("reset");
      }
    }, [data65]);

    useImperativeHandle<any, any>(ref, () => ({
      reset,
      crud,
    }));

    const resetForm = (type: string) => {
      if (type === "reset") {
      } else if (type === "jpName") {
      }
    };

    const crud = async (type: string | null) => {};

    const handleClickReset = () => {};

    const submit = async (params: any) => {};

    const openPopupCM1106 = async () => {};

    return (
      <>
        <form autoComplete="off" onSubmit={handleSubmit(submit)}>
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <div className="tab2">
              <Table1
                register={register}
                dictionary={dictionary}
                control={control}
                isAddBtnClicked={isAddBtnClicked}
                openPopupCM1106={openPopupCM1106}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Button
                text="저장"
                icon={<Update />}
                color={ButtonColor.SECONDARY}
                type="submit"
              />
              <Button
                text="취소"
                icon={<Reset />}
                type="button"
                onClick={handleClickReset}
              />
            </div>
          </div>
        </form>
      </>
    );
  }
);

export default Tab1;
