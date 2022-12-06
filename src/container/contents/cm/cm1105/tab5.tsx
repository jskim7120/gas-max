import { Input, Field, Wrapper, Label } from "components/form/style";

function Tab5({ register }: { register: Function }) {
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
            <Input label="CMS구분" register={register("cmsGubun")} />
            <Input label="예금주" register={register("CMSdepositor")} />
            <Input label="관리코드" register={register("managerNo")} />
          </Wrapper>

          <Wrapper grid>
            <Input label="은행/카드" register={register("CMSbankName")} />
            <Input label="계좌/카드번호" register={register("CMSacctno")} />
            <Input label="전화번호" register={register("tel")} />
          </Wrapper>

          <Wrapper grid>
            <Input label="승인일자" register={register("appdt")} />
            <Input label="약정일" register={register("monthday")} />
            <Input label="납부자상태" register={register("stateName")} />
          </Wrapper>

          <Wrapper grid col={2} fields="2fr 1fr">
            <Input label="비고" register={register("bigo")} />

            <Input label="등록일시" register={register("CMSregDate")} />
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
              fullWidth
            />
            <Input
              label="예금주"
              register={register("VIRdepositor")}
              fullWidth
            />
            <Input
              label="관리코드"
              register={register("managerCode")}
              fullWidth
            />
          </Wrapper>

          <Wrapper grid>
            <Input
              label="계좌번호"
              register={register("VIRacctno")}
              fullWidth
            />
            <Label style={{ width: "105px" }}></Label>

            <Input
              label="등록일시"
              register={register("VIRregDate")}
              fullWidth
            />
          </Wrapper>
        </Field>
      </Field>
    </Field>
  );
}

export default Tab5;
