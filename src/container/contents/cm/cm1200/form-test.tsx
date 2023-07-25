import React, { useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { FormGroup } from "components/form/style";
import { ICM1200SEARCH } from "./model";
import EditableSelect from "components/editableSelect";

const Form = React.forwardRef(
  (
    {
      ownAreaCode,
      menuId,
      dataCommonDic,
      userInfo,
      selectedUserInfo,
      setSelectedUserInfo,
      dataDictionary,
      setDataDictionary,
      supplyTab,
      fetchData,
      areaCode,
      selected,
      isAddBtnClicked,
      prepareSearchFormValues,
      clonedSelected,
    }: {
      ownAreaCode: string;
      menuId: string;
      dataCommonDic: any;
      userInfo: any;
      selectedUserInfo: any;
      setSelectedUserInfo: Function;
      dataDictionary: any;
      setDataDictionary: Function;
      supplyTab: any;
      fetchData: Function;
      areaCode: string;
      selected: any;
      isAddBtnClicked: boolean;
      setIsAddBtnClicked: Function;
      prepareSearchFormValues: Function;
      clonedSelected: any;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { handleSubmit, register, getValues, reset, watch } =
      useForm<ICM1200SEARCH>({
        mode: "onChange",
      });

    useEffect(() => {
      if (
        supplyTab !== undefined &&
        selected &&
        Object.keys(selected)?.length > 0
      ) {
        resetForm("reset");
      }
    }, [supplyTab]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      resetForm,
      crud,
    }));

    useEffect(() => {
      reset({ tankMakeCo1: "tmk1" });
    }, []);

    const resetForm = async (type: string) => {
      if (type === "reset") {
        if (selected && Object.keys(selected)?.length > 0) {
          let tempData: any = { ...selected, ...supplyTab };

          console.log("supplyTab:::", supplyTab);

          reset({
            ...tempData,
            cuAptnameYn: tempData?.cuAptnameYn === "Y",
            cuBaGageYn: tempData?.cuBaGageYn === "Y",
            chkCuZipCode: false,
            chkCuRh20: false,
            chkCuRdanga: false,
            chkCuAnKum: false,
            chkCuMeterKum: false,
            chkCuPer: false,
            chkCuCdc: false,
            chkCuSukumtype: false,
            chkCuGumTurm: false,
            chkCuGumdate: false,
            chkCuCno: false,
          });
        }
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: any) => {
      const formValues: any = getValues();
      console.log("formValues:::", formValues);
    };

    return (
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <FormGroup>
          <EditableSelect
            list={dataCommonDic?.tankMakeCo1}
            reset={reset}
            register={register("tankMakeCo1")}
            watch={watch("tankMakeCo1")}
            style={{ width: "110px", margin: "0 3px" }}
          />
        </FormGroup>
      </form>
    );
  }
);

export default Form;
