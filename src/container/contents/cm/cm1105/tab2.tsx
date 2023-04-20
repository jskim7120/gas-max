import { Input, Select, Field, FormGroup, Label } from "components/form/style";
import { currencyMask } from "helpers/currency";
import { Controller } from "react-hook-form";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { MagnifyingGlass } from "components/allSvgIcon";
import { SearchBtn } from "components/daum";
import CheckBox from "components/checkbox";

function Tab2({
  dataCommonDic,
  register,
  control,
  rdangaType,
  setRdangaType,
  rdanga,
  setRdanga,
  rdangaSign,
  setRdangaSign,
  rdangaAmt,
  setRdangaAmt,
  totalValue,
  setTotalValue,
  calcRdanga,
}: {
  dataCommonDic: any;
  register: Function;
  control: any;
  rdangaType: string;
  setRdangaType: Function;
  rdanga: string;
  setRdanga: Function;
  rdangaSign: string;
  setRdangaSign: Function;
  rdangaAmt: string;
  setRdangaAmt: Function;
  totalValue: string;
  setTotalValue: Function;
  calcRdanga: Function;
}) {
  const showRdanga = () => {
    if (rdangaType === "0") {
      return (
        <FormGroup className="0">
          <Input
            readOnly
            inputSize={InputSize.i60}
            value={rdanga}
            onChange={(e: any) => setRdanga(e.target.value)}
          />
          <p>원</p>
        </FormGroup>
      );
    }
    if (rdangaType === "1") {
      return (
        <FormGroup className="1">
          <Input
            inputSize={InputSize.i60}
            value={rdanga}
            onChange={(e: any) => {
              setRdanga(e.target.value);
              calcRdanga("rdanga", e.target.value);
            }}
          />
          <p>원</p>
          <Select
            width={InputSize.i50}
            value={rdangaSign}
            onChange={(e: any) => {
              setRdangaSign(e.target.value);
              calcRdanga("rdangaSign", e.target.value);
            }}
          >
            {dataCommonDic?.cuRdangaSign.map((obj: any, index: number) => (
              <option key={index} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
          <Input
            inputSize={InputSize.i60}
            textAlign="right"
            value={rdangaAmt}
            onChange={(e: any) => {
              setRdangaAmt(e.target.value);
              calcRdanga("rdangaAmt", e.target.value);
            }}
          />
          <p>{totalValue}</p>
        </FormGroup>
      );
    }
    if (rdangaType === "2") {
      return (
        <FormGroup className="2">
          <Input
            inputSize={InputSize.i60}
            value={rdanga}
            onChange={(e: any) => setRdanga(e.target.value)}
          />
        </FormGroup>
      );
    }
  };
  return (
    <div>
      <Field flex className="outer-border ">
        <Field className="gray-title">
          <p>
            체적 <br />
            단가
          </p>
        </Field>
        <Field>
          <FormGroup>
            <Label>조정기압력</Label>
            <Select register={register("cuRh2O")} width={InputSize.i130}>
              {dataCommonDic?.cuRh20?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <p>mmH20</p>

            <Label style={{ minWidth: "80px" }}>루베단가</Label>
            <Select
              width={InputSize.i130}
              value={rdangaType}
              register={register("cuRdangaType")}
              onChange={(e: any) => {
                setRdangaType(e.target.value);
                calcRdanga("rdangaType", e.target.value);
              }}
            >
              {dataCommonDic?.cuRdangaType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            {showRdanga()}
          </FormGroup>

          <FormGroup>
            <Controller
              control={control}
              {...register("cuPer")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="연체율"
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={[/\d/, /\d/, /\d/]}
                  inputSize={InputSize.i130}
                  textAlign="right"
                />
              )}
            />

            <p style={{ marginLeft: "2px" }}>%</p>

            <Controller
              control={control}
              {...register("cuCdc")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="할인율"
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={[/\d/, /\d/, /\d/]}
                  inputSize={InputSize.i130}
                  textAlign="right"
                />
              )}
            />
            <p style={{ marginLeft: "2px" }}>%</p>

            <Input
              label="순번"
              register={register("cuCno")}
              inputSize={InputSize.i110}
            />
          </FormGroup>

          <FormGroup>
            <Controller
              control={control}
              {...register("cuAnkum")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="관리비"
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i130}
                />
              )}
            />
            <p style={{ marginLeft: "2px" }}>원</p>

            <Controller
              control={control}
              {...register("cuSisulkum")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="시설비"
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i130}
                />
              )}
            />
            <p style={{ marginLeft: "2px" }}>원</p>

            <Controller
              control={control}
              {...register("cuMeterkum")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="계량기교체비"
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i110}
                />
              )}
            />
            <p>원</p>
          </FormGroup>

          <FormGroup>
            <Label>검침주기</Label>
            <Select register={register("cuGumTurm")} width={InputSize.i130}>
              {dataCommonDic?.cuGumTurm?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Controller
              control={control}
              {...register("cuGumdate")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="검침일"
                  labelStyle={{ marginLeft: "16px" }}
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={[/\d/, /\d/]}
                  inputSize={InputSize.i130}
                />
              )}
            />
            <p>일</p>

            <Label>기본사용료</Label>
            <Label
              className="lable-check"
              style={{
                minWidth: "auto",
                marginLeft: "3px",
              }}
            >
              <CheckBox title="적용" register={{ ...register("cuBaGageYn") }} />
            </Label>

            <Input
              register={register("cuBaGageM3", { valueAsNumber: true })}
              textAlign="right"
              inputSize={InputSize.i50}
            />
            <p>m3이하 일때</p>
            <Controller
              control={control}
              {...register("cuBaGageKum")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i80}
                />
              )}
            />
            <p>원 적용</p>
          </FormGroup>
        </Field>
      </Field>

      <Field
        flex
        className="outer-border"
        style={{
          marginTop: "20px",
        }}
      >
        <Field className="gray-title">
          <p>
            계량기
            <br />
            정보
          </p>
        </Field>
        <Field>
          <FormGroup>
            <Label>계량기 제조사</Label>
            <Select register={register("cuMeterCo")} width={InputSize.i130}>
              {dataCommonDic?.cuMeterCo?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ width: "136px" }}>계량기유형</Label>
            <Select register={register("cuMeterFeture")} width={InputSize.i130}>
              {dataCommonDic?.cuMeterFeture?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "135px" }}>계량기정보</Label>
            <Select register={register("cuMeterLr")} width={InputSize.i80}>
              {dataCommonDic?.cuMeterLr?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Select register={register("cuMeterType")}>
              {dataCommonDic?.cuMeterType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Input
              register={register("cuMeterM3", { valueAsNumber: true })}
              inputSize={InputSize.xs}
              textAlign="right"
            />
            <p>㎥/h</p>
          </FormGroup>
          <FormGroup>
            <Input
              label="계량기번호"
              register={register("cuMeterNo")}
              inputSize={InputSize.i130}
            />

            <Label style={{ width: "136px" }}>유효기간</Label>

            <Controller
              control={control}
              {...register("cuMeterTurm")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "130px" }}
                />
              )}
            />

            <Label style={{ minWidth: "135px" }}>설치장소</Label>
            <Select register={register("cuMeterPlace")} width={InputSize.i80}>
              {dataCommonDic?.cuMeterPlace?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <p style={{ margin: "0 3px 0 52px" }}>바코드번호</p>

            <Input
              register={register("cuBarcode")}
              inputSize={InputSize.i100}
            />
          </FormGroup>
          <FormGroup>
            <Label>교체일자</Label>

            <Controller
              control={control}
              {...register("cuMeterDt")}
              render={({ field: { onChange, name, value } }) => (
                <CustomDatePicker
                  value={value}
                  name={name}
                  onChange={onChange}
                  style={{ width: "130px" }}
                />
              )}
            />

            <Label style={{ width: "136px" }}>교체예정일</Label>

            <Controller
              control={control}
              {...register("cuMdate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "130px" }}
                />
              )}
            />

            <Input
              label="발신기코드"
              labelStyle={{ minWidth: "135px" }}
              register={register("cuMTransmCd")}
              inputSize={InputSize.i80}
            />
            <p style={{ margin: "0 3px 0 6px" }}>원격검침 고객코드</p>
            <Input register={register("blabla")} inputSize={InputSize.i100} />
            <SearchBtn type="button" onClick={() => alert("dsdsds")}>
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
        </Field>
      </Field>
    </div>
  );
}

export default Tab2;
