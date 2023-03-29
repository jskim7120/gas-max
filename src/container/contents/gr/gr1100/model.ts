export interface ISEARCH {
  //areaCode: string;
  sBuGubun: string;
  sBuName: string;
  sBuStae: string;
}

export interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
  areaCode: string;
  setAreaCode: Function;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  setIsCancelBtnDisabled: Function;
}

export interface ISANGPUM {
  areaCode: string;
  buAddr1: string;
  buAddr2: string;
  buBank: string;
  buBankju: string;
  buBankno: string;
  buBcost: number;
  buBdanga: number;
  buBigo: string;
  buBlcost: number;
  buBldanga: number;
  buCode: string;
  buDamdang: string;
  buEmail: string;
  buFax: string;
  buGubun: string;
  //buGubunName: string;
  buHp: string;
  buJongmok: string;
  buJpCode1: string;
  buJpCode2: string;
  buJpCode3: string;
  buJpCode4: string;
  // buJpName1: string;
  // buJpName2: string;
  // buJpName3: string;
  // buJpName4: string;
  buMisu: number;
  buName: string;
  buNo: string | number;
  buPcost: number;
  buPdanga: number;
  buRCode: string;
  buSajang: string;
  buSangho: string;
  buStae: string;
  // buStaeName: string;
  buTel: string;
  buUptae: string;
  buZipcode: string;
  emailKind: string;
}

export const emptyObj = {
  areaCode: "",
  buAddr1: "",
  buAddr2: "",
  buBank: "",
  buBankju: "",
  buBankno: "",
  buBcost: 0,
  buBdanga: 0,
  buBigo: "",
  buBlcost: 0,
  buBldanga: 0,
  buCode: "",
  buDamdang: "",
  buEmail: "",
  buFax: "",
  buGubun: "",
  // buGubunName: "",
  buHp: "",
  buJongmok: "",
  buJpCode1: "",
  buJpCode2: "",
  buJpCode3: "",
  buJpCode4: "",
  // buJpName1: "",
  // buJpName2: "",
  // buJpName3: "",
  // buJpName4: "",
  buMisu: 0,
  buName: "",
  buNo: "",
  buPcost: 0,
  buPdanga: 0,
  buRCode: "",
  buSajang: "",
  buSangho: "",
  buStae: "",
  // buStaeName: "",
  buTel: "",
  buUptae: "",
  buZipcode: "",
  mailKind: "",
};
