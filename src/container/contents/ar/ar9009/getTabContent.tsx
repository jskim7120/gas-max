import React from "react";
import Table from "components/table";
import { Input, Select } from "components/form/style";
import { InputSize } from "components/componentsType";
import { SearchWrapper } from "container/contents/commonStyle";

function getTabContent(
  id: number,
  register: any,
  dataCommonDic: any,
  data: any
) {
  switch (id) {
    case 0:
      return (
        <div>
          <SearchWrapper>
            <Input register={register("aptName")} />
          </SearchWrapper>
        </div>
      );
  }
  return null;
}

export default getTabContent;
