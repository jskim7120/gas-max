import { Path } from "react-hook-form";

export interface IFormProps {
  opt: number | null;
  swAddr1: string;
  swAddr2: string;
  swBigo: string;
  swCaCode: string;
  swCaName: string;
  swCode: number | null;
  swDriverNo: string;
  swDriverType: string;
  swGubun: string;
  swHp: string;
  swIndate: Date | null;
  swJdate1: Date | null;
  swJdate2: Date | null;
  swJuminno: string;
  swName: string;
  swPaydate: string;
  swPaykum: number | null;
  swPaytype: string;
  swTel: number | null;
  swWorkOut: string;
  swZipcode: string;
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
