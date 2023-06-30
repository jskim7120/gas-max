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
  watch,
  dataCommonDic,
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
  register: Function;
  watch: Function;
  dataCommonDic: any;
  control: any;
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
    <form autoComplete="off" className="tab1">
      <FormGroup>
        <Controller
          control={control}
          name="chkCuRh20"
          render={({ field }) => (
            <CheckBox
              {...field}
              title="조 정 기"
              className="label-check"
              style={{ width: "100px" }}
            />
          )}
        />

        <Controller
          control={control}
          name="cuRh2O"
          render={({ field }) => (
            <Select
              {...field}
              width={InputSize.i120}
              disabled={!watch("chkCuRh20")}
            >
              {dataCommonDic?.cuRh20?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          )}
        />
        <p>mmH20</p>

        <Controller
          control={control}
          name="chkCuRdanga"
          render={({ field }) => (
            <CheckBox
              {...field}
              title="루베단가"
              className="label-check"
              style={{ width: "99px" }}
            />
          )}
        />

        <Select
          name="rdangaType"
          value={rdangaType}
          onChange={(e: any) => {
            setRdangaType(e.target.value);
            calcRdanga("rdangaType", e.target.value);
          }}
          width={InputSize.i120}
          disabled={!watch("chkCuRdanga")}
        >
          {dataCommonDic?.cuRdangaType.map((obj: any, index: number) => (
            <option key={index} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
        {showRdanga()}
      </FormGroup>
      <FormGroup>
        <Controller
          control={control}
          name="chkCuAnKum"
          render={({ field }) => (
            <CheckBox
              {...field}
              title="관 리 비"
              className="label-check"
              style={{ width: "100px" }}
            />
          )}
        />

        <Controller
          control={control}
          name="cuAnkum"
          render={({ field }) => (
            <Input
              {...field}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i120}
              readOnly={!watch("chkCuAnKum")}
            />
          )}
        />
        <p>원</p>

        <Controller
          control={control}
          name="chkCuMeterKum"
          render={({ field }) => (
            <CheckBox
              {...field}
              title="계 량 기"
              style={{ width: "140px" }}
              className="label-check"
            />
          )}
        />

        <Controller
          control={control}
          name="cuMeterkum"
          render={({ field }) => (
            <Input
              {...field}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i120}
              readOnly={!watch("chkCuMeterKum")}
            />
          )}
        />
        <p>원</p>

        <Label style={{ minWidth: "110px" }}>기본사용료</Label>
        <Controller
          control={control}
          name="cuBaGageYn"
          render={({ field }) => (
            <CheckBox
              {...field}
              title="적용"
              className="label-check"
              style={{ width: "60px" }}
            />
          )}
        />

        <Input
          type="number"
          register={register("cuBaGageM3", {
            valueAsNumber: true,
          })}
          textAlign="right"
          inputSize={InputSize.i80}
        />
        <p>m3이하 일때</p>
        <Controller
          control={control}
          name="cuBaGageKum"
          render={({ field }) => (
            <Input
              {...field}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i80}
            />
          )}
        />
        <p>원 적용</p>
      </FormGroup>
      <FormGroup>
        <Controller
          control={control}
          name="chkCuPer"
          render={({ field }) => (
            <CheckBox
              {...field}
              title="연 체 율"
              className="label-check"
              style={{ width: "100px" }}
            />
          )}
        />

        <Controller
          control={control}
          name="cuPer"
          render={({ field }) => (
            <Input
              {...field}
              mask={[/\d/, /\d/, /\d/]}
              readOnly={!watch("chkCuPer")}
              inputSize={InputSize.i120}
              textAlign="right"
            />
          )}
        />
        <p>{`%`}</p>

        <Controller
          control={control}
          name="chkCuCdc"
          render={({ field }) => (
            <CheckBox
              {...field}
              title="할 인 율"
              className="label-check"
              style={{ width: "140px" }}
            />
          )}
        />

        <Controller
          control={control}
          name="cuCdc"
          render={({ field }) => (
            <Input
              {...field}
              mask={[/\d/, /\d/, /\d/]}
              readOnly={!watch("chkCuCdc")}
              inputSize={InputSize.i120}
              textAlign="right"
            />
          )}
        />
        <p>{`%`}</p>

        <Controller
          control={control}
          name="chkCuSukumtype"
          render={({ field }) => (
            <CheckBox
              {...field}
              title="수금 방법"
              className="label-check"
              style={{ width: "170px" }}
            />
          )}
        />

        <Controller
          control={control}
          name="cuSukumtype"
          render={({ field }) => (
            <Select
              {...field}
              disabled={!watch("chkCuSukumtype")}
              width={InputSize.i120}
            >
              {dataCommonDic?.cuSukumtype?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          )}
        />
      </FormGroup>
      <FormGroup>
        <Controller
          control={control}
          name="chkCuGumTurm"
          render={({ field }) => (
            <CheckBox
              {...field}
              title="검침주기"
              className="label-check"
              style={{ width: "100px" }}
            />
          )}
        />

        <Controller
          control={control}
          name="cuGumTurm"
          render={({ field }) => (
            <Select
              {...field}
              disabled={!watch("chkCuGumTurm")}
              width={InputSize.i175}
            >
              {dataCommonDic?.cuGumTurm?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="chkCuGumdate"
          render={({ field }) => (
            <CheckBox
              {...field}
              title="검 침 일"
              className="label-check"
              style={{ width: "99px" }}
            />
          )}
        />

        <Controller
          control={control}
          name="cuGumdate"
          render={({ field }) => (
            <Input
              {...field}
              mask={[/\d/, /\d/]}
              inputSize={InputSize.i120}
              readOnly={!watch("chkCuGumdate")}
            />
          )}
        />
        <p>일</p>

        <Controller
          control={control}
          name="chkCuCno"
          render={({ field }) => (
            <CheckBox
              {...field}
              title="순 번"
              className="label-check"
              style={{ width: "170px" }}
            />
          )}
        />

        <Controller
          control={control}
          name="cuCno"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i120}
              readOnly={!watch("chkCuCno")}
            />
          )}
        />
      </FormGroup>
    </form>
  );
}

export default Tab1;
