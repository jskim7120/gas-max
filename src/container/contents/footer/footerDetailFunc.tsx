import { FOOTDETAIL } from "app/path";
import API from "app/axios";
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

  try {
    const res = await API.get(FOOTDETAIL, {
      params: { areaCode: areaCode, sCuCode: sCuCode },
    });

    if (res.data) {
      dispatch(addInfo({ info: res.data[0] }));
    } else {
      dispatch(addInfo({ info: emptyFooterObj }));
    }
  } catch (err) {
    dispatch(addInfo({ info: emptyFooterObj }));
    console.log("fetch footer detail err:::", err);
  }

  return null;
};

export default setFooterDetail;
