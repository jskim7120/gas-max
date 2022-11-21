import {
  Input,
  Field,
  Wrapper,
  DividerGray,
  Label,
} from "components/form/style";

function Tab5({ register, errors }: { register: Function; errors: any }) {
  return (
    <Field>
      <Field
        flex
        className="outer-border"
        style={{
          width: "fit-content",
        }}
      >
        <Field className="gray-title">
          <p>
            자동
            <br />
            이체
          </p>
        </Field>
        <Field>
          <Wrapper grid>
            <Input
              label="CMS구분"
              register={register("cmsGubun")}
              errors={errors["cmsGubun"]?.message}
            />
            <Input
              label="예금주"
              register={register("CMSdepositor")}
              errors={errors["CMSdepositor"]?.message}
            />
            <Input
              label="관리코드"
              register={register("managerNo")}
              errors={errors["managerNo"]?.message}
            />
          </Wrapper>
          <DividerGray />
          <Wrapper grid>
            <Input
              label="은행/카드"
              register={register("CMSbankName")}
              errors={errors["CMSbankName"]?.message}
            />
            <Input
              label="계좌/카드번호"
              register={register("CMSacctno")}
              errors={errors["CMSacctno"]?.message}
            />
            <Input
              label="전화번호"
              register={register("tel")}
              errors={errors["tel"]?.message}
            />
          </Wrapper>
          <DividerGray />
          <Wrapper grid>
            <Input
              label="승인일자"
              register={register("appdt")}
              errors={errors["appdt"]?.message}
            />
            <Input
              label="약정일"
              register={register("monthday")}
              errors={errors["monthday"]?.message}
            />
            <Input
              label="납부자상태"
              register={register("stateName")}
              errors={errors["stateName"]?.message}
            />
          </Wrapper>
          <DividerGray />
          <Wrapper grid col={2} fields="2fr 1fr">
            <Input
              label="비고"
              register={register("bigo")}
              errors={errors["bigo"]?.message}
            />

            <Input
              label="등록일시"
              register={register("CMSregDate")}
              errors={errors["CMSregDate"]?.message}
            />
          </Wrapper>
        </Field>
      </Field>
      <Field
        flex
        className="outer-border"
        style={{
          marginTop: "20px",
          width: "fit-content",
        }}
      >
        <Field className="gray-title">
          <p>
            가상
            <br />
            계좌
          </p>
        </Field>
        <Field>
          <Wrapper grid>
            <Input
              label="은행명"
              register={register("VIRbankName")}
              errors={errors["VIRbankName"]?.message}
              fullWidth
            />
            <Input
              label="예금주"
              register={register("VIRdepositor")}
              errors={errors["VIRdepositor"]?.message}
              fullWidth
            />
            <Input
              label="관리코드"
              register={register("managerCode")}
              errors={errors["managerCode"]?.message}
              fullWidth
            />
          </Wrapper>
          <DividerGray />
          <Wrapper grid>
            <Input
              label="계좌번호"
              register={register("VIRacctno")}
              errors={errors["VIRacctno"]?.message}
              fullWidth
            />
            <Label style={{ width: "105px" }}></Label>

            <Input
              label="등록일시"
              register={register("VIRregDate")}
              errors={errors["VIRregDate"]?.message}
              fullWidth
            />
          </Wrapper>
        </Field>
      </Field>
    </Field>
  );
}

export default Tab5;
