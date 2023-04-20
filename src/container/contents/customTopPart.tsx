import { SearchWrapper } from "./commonStyle";
import { Select, FormGroup } from "components/form/style";

function CustomTopPart({
  areaCode,
  depthFullName,
  register,
  dataCommonDic,
  bigText,
}: {
  areaCode: string;
  depthFullName: string;
  register: any;
  dataCommonDic: any;
  bigText?: string;
}) {
  return (
    <SearchWrapper className="h35 mt5">
      <FormGroup>
        <p>{depthFullName}</p>
        {areaCode === "00" && (
          <>
            <p className="big">{bigText ? bigText : `영업소`}</p>

            <Select register={register("areaCode")}>
              {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </>
        )}
      </FormGroup>
    </SearchWrapper>
  );
}

export function CustomAreaCodePart({
  areaCode,
  depthFullName,
  register,
  dataCommonDic,
  bigText,
}: {
  areaCode: string;
  depthFullName: string;
  register: any;
  dataCommonDic: any;
  bigText?: string;
}) {
  return (
    <FormGroup>
      <p>{depthFullName}</p>
      {areaCode === "00" && (
        <>
          <p className="big">{bigText ? bigText : `영업소`}</p>

          <Select register={register("areaCode")}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </>
      )}
    </FormGroup>
  );
}

export function AreaCodeWithFullName({
  ownAreaCode,
  depthFullName,
  bigText,
  setAreaCode,
  areaCode,
  dataCommonDic,
}: {
  ownAreaCode: string;
  depthFullName: string;
  bigText?: string;
  setAreaCode: Function;
  areaCode: string;
  dataCommonDic: any;
}) {
  return (
    <FormGroup>
      <p>{depthFullName}</p>
      {ownAreaCode === "00" && (
        <>
          <p className="big">{bigText ? bigText : `영업소`}</p>
          <Select
            value={areaCode}
            onChange={(e) => setAreaCode(e.target.value)}
          >
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </>
      )}
    </FormGroup>
  );
}

export default CustomTopPart;
