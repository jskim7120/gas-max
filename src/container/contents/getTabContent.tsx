import React from "react";
import Table from "components/Table";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  FormInline,
  FormBlock,
  Wrapper,
  Divider,
} from "components/form/style";
import { InputSize } from "components/ComponentsType";

function getTabContent(id: number) {
  const data1 = [
    {
      name: "양식 1",
      age: (
        <Field>
          <Input type="text" name="jnJiroSNo" defaultValue="jnJiroSNo" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla: (
        <Field>
          <Input type="text" name="jnJiroNo" defaultValue="jnJiroNo" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla2: (
        <Field>
          <Input type="text" name="jnJiroBigo" defaultValue="jnJiroBigo" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla3: (
        <Field>
          <select style={{ width: "150px" }}>
            <option value="">jnJiro</option>
          </select>
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      name: "양식 2",
      age: (
        <Field>
          <Input type="text" name="jnJiroSNo02" defaultValue="jnJiroSNo02" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla: (
        <Field>
          <Input type="text" name="jnJiroNo02" defaultValue="jnJiroNo02" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla2: (
        <Field>
          <Input type="text" name="jnJiroBigo02" defaultValue="jnJiroBigo02" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla3: (
        <Field>
          <select style={{ width: "150px" }}>
            <option value="">jnJiro2</option>
          </select>
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      name: "양식 3",
      age: (
        <Field>
          <Input type="text" name="jnJiroSNo03" defaultValue="jnJiroSNo03" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla: (
        <Field>
          <Input type="text" name="jnJiroNo03" defaultValue="jnJiroNo03" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla2: (
        <Field>
          <Input type="text" name="jnJiroBigo03" defaultValue="jnJiroBigo03" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla3: (
        <Field>
          <select style={{ width: "150px" }}>
            <option value="">jnJiro3</option>
          </select>
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      name: "양식 4",
      age: (
        <Field>
          <Input type="text" name="jnJiroSNo04" defaultValue="jnJiroSNo04" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla: (
        <Field>
          <Input type="text" name="jnJiroNo04" defaultValue="jnJiroNo04" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla2: (
        <Field>
          <Input type="text" name="jnJiroBigo04" defaultValue="jnJiroBigo04" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      bla3: (
        <Field>
          <select style={{ width: "150px" }}>
            <option value="">jnJiro4</option>
          </select>
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
    },
  ];

  const data3 = [
    {
      jnBank1: (
        <Field>
          <Input type="text" name="jnBank1" defaultValue="jnBank1" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      jnBankNo1: (
        <Field>
          <Input type="text" name="jnBankNo1" defaultValue="jnBankNo1" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      jnBank2: (
        <Field>
          <Input type="text" name="jnBank2" defaultValue="jnBank2" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      jnBankNo2: (
        <Field>
          <Input type="text" name="jnBankNo2" defaultValue="jnBankNo2" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      jnBank3: (
        <Field>
          <Input type="text" name="jnBank3" defaultValue="jnBank3" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      jnBankNo3: (
        <Field>
          <Input type="text" name="jnBankNo3" defaultValue="jnBankNo3" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
    },
    {
      jnBank4: (
        <Field>
          <Input type="text" name="jnBank4" defaultValue="jnBank4" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      jnBankNo4: (
        <Field>
          <Input type="text" name="jnBankNo4" defaultValue="jnBankNo4" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
    },
  ];

  const data4 = [
    {
      jnMark1: (
        <Field>
          <Input type="text" name="jnMark1" defaultValue="jnMark1" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      jnMark2: (
        <Field>
          <Input type="text" name="jnMark2" defaultValue="jnMark2" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      jnMark3: (
        <Field>
          <Input type="text" name="jnMark3" defaultValue="jnMark3" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      jnMark4: (
        <Field>
          <Input type="text" name="jnMark4" defaultValue="jnMark4" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
      jnMark5: (
        <Field>
          <Input type="text" name="jnMark5" defaultValue="jnMark5" />
          <div>
            <ErrorText>{}</ErrorText>
          </div>
        </Field>
      ),
    },
  ];

  switch (id) {
    case 0:
      return (
        <Table
          tableHeader={[
            "지로 양식",
            "승인번호",
            "지로번호",
            "상호(구분명)",
            "용지 형식",
          ]}
          tableData={data1}
          onClick={(item) => console.log("table", item)}
        />
      );
    case 1:
      return (
        <div>
          <Field>
            <Input
              type="text"
              name="edJnOrderO1"
              defaultValue="edJnOrderO1"
              inputSize={InputSize.lg}
            />
            <div>
              <ErrorText>{}</ErrorText>
            </div>
          </Field>
          <Field>
            <Input
              type="text"
              name="edJnOrderO2"
              defaultValue="edJnOrderO2"
              inputSize={InputSize.lg}
            />
            <div>
              <ErrorText>{}</ErrorText>
            </div>
          </Field>
          <Field>
            <Input
              type="text"
              name="edJnOrderO3"
              defaultValue="edJnOrderO3"
              inputSize={InputSize.lg}
            />
            <div>
              <ErrorText>{}</ErrorText>
            </div>
          </Field>
          <Field>
            <Input
              type="text"
              name="edJnOrderO4"
              defaultValue="edJnOrderO4"
              inputSize={InputSize.lg}
            />
            <div>
              <ErrorText>{}</ErrorText>
            </div>
          </Field>
          <Field>
            <Input
              type="text"
              name="edJnOrderO5"
              defaultValue="edJnOrderO5"
              inputSize={InputSize.lg}
            />
            <div>
              <ErrorText>{}</ErrorText>
            </div>
          </Field>
          <Field>
            <Input
              type="text"
              name="edJnOrderO6"
              defaultValue="edJnOrderO6"
              inputSize={InputSize.lg}
            />
            <div>
              <ErrorText>{}</ErrorText>
            </div>
          </Field>
        </div>
      );
    case 2:
      return (
        <Table
          tableHeader={["은행명", "계좌번호"]}
          tableData={data3}
          onClick={(item) => console.log("table", item)}
        />
      );
    case 3:
      return (
        <Table
          tableHeader={["담 당", "과 장", "부 장", "전 무", "대 표"]}
          tableData={data4}
          onClick={(item) => console.log("table", item)}
        />
      );
  }
  return null;
}

export default getTabContent;
