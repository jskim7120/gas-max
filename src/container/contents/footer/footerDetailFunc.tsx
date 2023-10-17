import { FOOTDETAIL } from "app/path";
import { apiGet, apiPost } from "app/axios";
import { addInfo } from "app/state/footer/footerSlice";

const setFooterDetail = async (
  areaCode: string,
  sCuCode: string,
  dispatch: any
) => {
  const emptyFooterObj = {
    areaCode: "",
    barcodeYn: "",
    cuAddr1n2: "",
    cuBigo1: "",
    cuBigo2: "",
    cuCmisu: "",
    cuCode: "",
    cuGongdate: "",
    cuHdate: "",
    cuHdateT: "",
    cuHp: "",
    cuJmisu: "",
    cuNo: "",
    cuSaddr1: "",
    cuSangho: "",
    cuStae: "",
    cuStaeName: "",
    cuSukumtype: "",
    cuSukumtypeName: "",
    cuSwCode: "",
    cuSwName: "",
    cuTel: "",
    cuTel2: "",
    cuTongkum: "",
    cuType: "",
    cuTypeName: "",
    cuUsername: "",
    cuViewName: "",
    jTransYn: "",
    mTransYn: "",
    tTransYn: "",
  };

  const response = await apiGet(FOOTDETAIL, {
    areaCode: areaCode,
    sCuCode: sCuCode,
  });

  if (response && response?.length > 0) {
    await dispatch(addInfo({ info: response[0] }));
  } else {
    await dispatch(addInfo({ info: {} }));
  }

  return null;
};

export const fetchFooterData = async (areaCode: string, cuCode: string) => {
  const res = await apiGet(FOOTDETAIL, {
    areaCode: areaCode,
    sCuCode: cuCode,
  });
  return Object.keys(res)?.length > 0 ? res[0] : {};
};

export default setFooterDetail;
