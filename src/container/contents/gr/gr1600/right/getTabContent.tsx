import Tab1 from "./tab1";
import Tab2 from "./tab2";
import Tab3 from "./tab3";

function getTabContent(
  id: number,
  register: any,
  errors: any,
  tabData: any,
  selected: any,
  values1: any,
  values2: any,
  labels1: any,
  labels2: any,
  update: any,
  clearForm: any
) {
  switch (id) {
    case 0:
      return (
        <Tab1
          register={register}
          errors={errors}
          tabData={tabData}
          update={update}
          clearForm={clearForm}
        />
      );
    case 1:
      return (
        <Tab2
          buCode={selected?.buCode}
          areaCode={selected?.areaCode}
          values1={values1}
          values2={values2}
          labels1={labels1}
          labels2={labels2}
        />
      );
    case 2:
      return (
        <Tab3
          buCode={selected?.buCode}
          areaCode={selected?.areaCode}
          values1={values1}
          values2={values2}
          labels1={labels1}
          labels2={labels2}
        />
      );
  }
  return null;
}

export default getTabContent;
