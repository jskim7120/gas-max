import { Path } from "react-hook-form";

export interface IFormProps {
  areaCode: number;
  areaName: number;
  jnSsno: string;
  jnSangho: string;
  jnSajang: string;
  jnZipcode: number;
  jnAddr1: string;
  jnAddr2: string;
  jnUptae: string;
  jnJongmok: string;
  jnTel1: number;
  jnTel2: number;
  jnFax: number;
  jnAnName1: string;
  jnAnName2: string;
  jnAnTel1: number;
  jnAnTel2: number;
  jnSekum: string;
  jnSegongYn: string;
  jnVatSumyn: string;
  jnSekumEa: string;
  jnJangbu: string;
  jnCmngno: number;
  innopayBankYn: string;
  niceBankYn: string;

  jnJiroSNo: string;
  jnJiroSNo02: string;
  jnJiroSNo03: string;
  jnJiroSNo04: string;

  jnJiroNo: string;
  jnJiroNo02: string;
  jnJiroNo03: string;
  jnJiroNo04: string;

  jnJiroBigo: string;
  jnJiroBigo02: string;
  jnJiroBigo03: string;
  jnJiroBigo04: string;

  jnJiro: string;
  jnJiro2: string;
  jnJiro3: string;
  jnJiro4: string;

  edJnOrderO1: string;
  edJnOrderO2: string;
  edJnOrderO3: string;
  edJnOrderO4: string;
  edJnOrderO5: string;
  edJnOrderO6: string;

  jnBank1: string;
  jnBank2: string;
  jnBank3: string;
  jnBank4: string;

  jnBankNo1: string;
  jnBankNo2: string;
  jnBankNo3: string;
  jnBankNo4: string;

  jnMark1: string;
  jnMark2: string;
  jnMark3: string;
  jnMark4: string;
  jnMark5: string;
}

export interface IElementProps {
  type: string;
  label: string;
  name: Path<IFormProps>;
  value: string;
  inputType?: string;
  options?: Array<string>;
  date?: Date;
}
