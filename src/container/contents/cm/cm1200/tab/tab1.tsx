import React from "react";
import { Controller } from "react-hook-form";
import {
  FormGroup,
  Input,
  Label,
  Select,
  Wrapper,
} from "components/form/style";
import { InputSize } from "components/componentsType";
import { currencyMask } from "helpers/currency";
import CheckBox from "components/checkbox";

function Tab1({
  register,
  dataCommonDic,
  control,
  chkCuRh20,
  setChkCuRh20,
  chkCuRdanga,
  setChkCuRdanga,
  chkCuAnKum,
  setChkCuAnKum,
  chkCuMeterKum,
  setChkCuMeterKum,
  chkCuPer,
  setChkCuPer,
  chkCuCdc,
  setChkCuCdc,
  chkCuSukumtype,
  setChkCuSukumtype,
  chkCuGumTurm,
  setChkCuGumTurm,
  chkCuGumdate,
  setChkCuGumdate,
  chkCuCno,
  setChkCuCno,
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
  register: Function;
  dataCommonDic: any;
  control: any;
  chkCuRh20: boolean;
  setChkCuRh20: Function;
  chkCuRdanga: boolean;
  setChkCuRdanga: Function;
  chkCuAnKum: boolean;
  setChkCuAnKum: Function;
  chkCuMeterKum: boolean;
  setChkCuMeterKum: Function;
  chkCuPer: boolean;
  setChkCuPer: Function;
  chkCuCdc: boolean;
  setChkCuCdc: Function;
  chkCuSukumtype: boolean;
  setChkCuSukumtype: Function;
  chkCuGumTurm: boolean;
  setChkCuGumTurm: Function;
  chkCuGumdate: boolean;
  setChkCuGumdate: Function;
  chkCuCno: boolean;
  setChkCuCno: Function;
  rdangaType: any;
  setRdangaType: Function;
  rdanga: any;
  setRdanga: Function;
  rdangaSign: any;
  setRdangaSign: Function;
  rdangaAmt: any;
  setRdangaAmt: Function;
  totalValue: any;
  setTotalValue: any;
  calcRdanga: any;
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
    <div className="tab1">
      <Wrapper grid col={3} fields="0.7fr 0.8fr 1.5fr">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="조 정 기"
                checked={chkCuRh20}
                onChange={(e: any) => setChkCuRh20(e.target.checked)}
              />
            </Label>
            <Select
              disabled={!chkCuRh20}
              {...register("cuRh2O")}
              width={InputSize.i120}
            >
              {dataCommonDic?.cuRh20?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <p>mmH20</p>
          </FormGroup>
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="관 리 비"
                checked={chkCuAnKum}
                onChange={(e: any) => setChkCuAnKum(e.target.checked)}
              />
            </Label>

            <Controller
              control={control}
              {...register("cuAnkum")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i120}
                  readOnly={!chkCuAnKum}
                />
              )}
            />
            <p>원</p>
          </FormGroup>
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="연 체 율"
                checked={chkCuPer}
                onChange={(e: any) => setChkCuPer(e.target.checked)}
              />
            </Label>

            <Controller
              control={control}
              {...register("cuPer")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={[/\d/, /\d/, /\d/]}
                  readOnly={!chkCuPer}
                  inputSize={InputSize.i120}
                  textAlign="right"
                />
              )}
            />
            <p>{`%`}</p>
          </FormGroup>
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="검침주기"
                //register={register("chkCuGumTurm")}
                checked={chkCuGumTurm}
                onChange={(e: any) => setChkCuGumTurm(e.target.checked)}
              />
            </Label>
            <Select
              disabled={!chkCuGumTurm}
              {...register("cuGumTurm")}
              width={InputSize.i175}
            >
              {dataCommonDic?.cuGumTurm?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="루베단가"
                checked={chkCuRdanga}
                onChange={(e: any) => setChkCuRdanga(e.target.checked)}
              />
            </Label>
            <Select
              disabled={!chkCuRdanga}
              value={rdangaType}
              onChange={(e: any) => {
                setRdangaType(e.target.value);
                calcRdanga("rdangaType", e.target.value);
              }}
              width={InputSize.i120}
            >
              {dataCommonDic?.cuRdangaType.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="계 량 기"
                checked={chkCuMeterKum}
                onChange={(e: any) => setChkCuMeterKum(e.target.checked)}
              />
            </Label>

            <Controller
              control={control}
              {...register("cuMeterkum")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i120}
                  readOnly={!chkCuMeterKum}
                />
              )}
            />
            <p>원</p>
          </FormGroup>
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="할 인 율"
                checked={chkCuCdc}
                onChange={(e: any) => setChkCuCdc(e.target.checked)}
              />
            </Label>

            <Controller
              control={control}
              {...register("cuCdc")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={[/\d/, /\d/, /\d/]}
                  readOnly={!chkCuCdc}
                  inputSize={InputSize.i120}
                  textAlign="right"
                />
              )}
            />
            <p>{`%`}</p>
          </FormGroup>
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="검 침 일"
                checked={chkCuGumdate}
                onChange={(e: any) => setChkCuGumdate(e.target.checked)}
              />
            </Label>

            <Controller
              control={control}
              {...register("cuGumdate")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={[/\d/, /\d/]}
                  inputSize={InputSize.i120}
                  readOnly={!chkCuGumdate}
                />
              )}
            />
            <p>일</p>
          </FormGroup>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {showRdanga()}
          <FormGroup style={{ gap: "7px" }}>
            <Label style={{ minWidth: "auto" }}>기본사용료</Label>

            <Label className="lable-check" style={{ minWidth: "60px" }}>
              <CheckBox title="적용" register={{ ...register("cuBaGageYn") }} />
            </Label>

            <Input
              type="number"
              register={register("cuBaGageM3", {
                valueAsNumber: true,
              })}
              textAlign="right"
              inputSize={InputSize.i80}
              style={{ marginLeft: "0px" }}
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
          <FormGroup>
            <Label className="lable-check" style={{ minWidth: "143px" }}>
              <CheckBox
                title="수금 방법"
                checked={chkCuSukumtype}
                onChange={(e: any) => setChkCuSukumtype(e.target.checked)}
              />
            </Label>
            <Select
              disabled={!chkCuSukumtype}
              {...register("cuSukumtype")}
              width={InputSize.i120}
            >
              {dataCommonDic?.cuSukumtype?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label className="lable-check" style={{ minWidth: "143px" }}>
              <CheckBox
                title="순 번"
                checked={chkCuCno}
                onChange={(e: any) => setChkCuCno(e.target.checked)}
              />
            </Label>
            <Input
              register={register("cuCno")}
              inputSize={InputSize.i120}
              readOnly={!chkCuCno}
            />
          </FormGroup>
        </div>
      </Wrapper>
    </div>
  );
}

export default Tab1;
