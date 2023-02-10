import { SearchWrapper } from "./commonStyle";
import { Select, Field } from "components/form/style";

function CustomTopPart({
  depthFullName,
  register,
  dataCommonDic,
  bigText,
}: {
  depthFullName: string;
  register: any;
  dataCommonDic: any;
  bigText?: string;
}) {
  return (
    <SearchWrapper className="h35 mt5">
      <Field flex>
        <p>{depthFullName}</p>
        <p className="big">{bigText ? bigText : `영업소`}</p>

        <Select {...register("areaCode")}>
          {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      </Field>
    </SearchWrapper>
  );
}

export default CustomTopPart;
