import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Field,
  FormGroup,
  Input,
  Label,
  Select as CSelect,
  Divider,
  Wrapper,
} from "components/form/style";
import { InputSize } from "components/componentsType";
import { currencyMask } from "helpers/currency";
import CheckBox from "components/checkbox";

function Tab1({
  register,
  dataCommonDic,
  control,
  renderRdangaCalc,
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
}: {
  register: Function;
  dataCommonDic: any;
  control: any;
  renderRdangaCalc: Function;
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
}) {
  return (
    <div>
      {/* 2-1 Wrapper */}
      <Wrapper grid col={3} fields="1fr 1fr 2fr">
        <FormGroup>
          <Label className="lable-check">
            <CheckBox
              title="조정기"
              checked={chkCuRh20}
              onChange={(e: any) => setChkCuRh20(e.target.checked)}
            />
          </Label>
          <CSelect
            disabled={!chkCuRh20}
            {...register("cuRh2o")}
            width={InputSize.i120}
          >
            {dataCommonDic?.cuRh20?.map((obj: any, index: number) => (
              <option key={index} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </CSelect>
          <p>mmH20</p>
        </FormGroup>

        <FormGroup>
          <Label className="lable-check">
            <CheckBox
              title="루베단가"
              checked={chkCuRdanga}
              onChange={(e: any) => setChkCuRdanga(e.target.checked)}
            />
          </Label>
          <CSelect
            disabled={!chkCuRdanga}
            {...register("cuRdangaType")}
            width={InputSize.i120}
          >
            {dataCommonDic?.cuRdangaType.map((obj: any, index: number) => (
              <option key={index} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </CSelect>
        </FormGroup>

        {renderRdangaCalc()}
      </Wrapper>
      {/* 2-2 Wrapper */}
      <Wrapper grid col={3} fields="1fr 1fr 2fr">
        <FormGroup>
          <Label className="lable-check">
            <CheckBox
              title="관리비"
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
              title="계량기"
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

        <FormGroup style={{ gap: "7px" }}>
          <Label style={{ minWidth: "auto" }}>기본사용료</Label>
          <Label className="lable-check" style={{ minWidth: "98px" }}>
            <CheckBox title="적용" register={{ ...register("cuBaGageYn") }} />
          </Label>

          <Input
            register={register("cuBaGageM3")}
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
                inputSize={InputSize.i120}
              />
            )}
          />
          <p>원 적용</p>
        </FormGroup>
      </Wrapper>

      <Wrapper grid col={3} fields="1fr 1fr 2fr">
        <FormGroup>
          <Label className="lable-check">
            <CheckBox
              title="연체율"
              //register={register("chkCuPer")}
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
                inputSize={InputSize.i50}
                textAlign="right"
              />
            )}
          />
          <p>{`%`}</p>
        </FormGroup>

        <FormGroup>
          <Label className="lable-check">
            <CheckBox
              title="할인율"
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
                inputSize={InputSize.i50}
                textAlign="right"
              />
            )}
          />
          <p>{`%`}</p>
        </FormGroup>

        <FormGroup>
          <Label className="lable-check">
            <CheckBox
              title="수금방법"
              checked={chkCuSukumtype}
              onChange={(e: any) => setChkCuSukumtype(e.target.checked)}
            />
          </Label>
          <CSelect
            disabled={!chkCuSukumtype}
            {...register("cuSukumtype")}
            width={InputSize.i120}
          >
            {dataCommonDic?.cuSukumtype?.map((obj: any, index: number) => (
              <option key={index} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </CSelect>
        </FormGroup>
      </Wrapper>
      {/* 2-4 Wrapper */}
      <Wrapper grid col={3} fields="1fr 1fr 2fr">
        <FormGroup>
          <Label className="lable-check">
            <CheckBox
              title="검침주기"
              //register={register("chkCuGumTurm")}
              checked={chkCuGumTurm}
              onChange={(e: any) => setChkCuGumTurm(e.target.checked)}
            />
          </Label>
          <CSelect
            disabled={!chkCuGumTurm}
            {...register("cuGumTurm")}
            width={InputSize.i175}
          >
            {dataCommonDic?.cuGumTurm?.map((obj: any, index: number) => (
              <option key={index} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </CSelect>
        </FormGroup>

        <FormGroup>
          <Label className="lable-check">
            <CheckBox
              title="검침일"
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
                inputSize={InputSize.i40}
                readOnly={!chkCuGumdate}
              />
            )}
          />
          <p>일</p>
        </FormGroup>

        <FormGroup>
          <Label className="lable-check">
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
      </Wrapper>
      <Divider />
    </div>
  );
}

export default Tab1;
