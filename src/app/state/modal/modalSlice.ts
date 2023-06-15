import { createSlice } from "@reduxjs/toolkit";

export interface initialStateType {
  modalIsOpen: boolean;
  menu: any;
  type: string;
  cm1105: {
    cuCode: string;
    areaCode: string;
    status: string;
    source: string;
  };
  cm1106: {
    cuCode: string;
    areaCode: string;
    source: string;
    jpName: string;
    jpCode: string;
    custIn: string;
    custOut: string;
    jcBasicJaego: string;
  };
  gr1200Popup: {
    index: number | undefined;
    areaCode: string;
    bcBuCode: string;
    bcChitType: number | undefined;
  };
  gr1200: any;
  // {
  // index: number | undefined;
  // areaCode: string;
  // bcBuCode: string;
  // bcChitType: string;
  // jpCode: string | undefined;
  // jpCost: number | undefined;
  // jpDanga: number | undefined;
  // jpGubun: string | undefined;
  // jpKg: number | undefined;
  // jpName: string | undefined;
  // jpSvyn: string | undefined;
  // isProductNameSelected: string | undefined;
  // };
  gr1300: {
    index: number | undefined;
    areaCode: string;
    bbBuCode: string;
    bbType: string;

    bpName: string | undefined;
    bpCode: string | undefined;
    jbuBpDanga: string | undefined;
    jbuVatKind: string | undefined;
    isProductNameSelected: string | undefined;
  };
  cc1100: {
    acjType: string | undefined;
    accCode: string | undefined;
    accName: string | undefined;
    acsCode: string | undefined;
    acsName: string | undefined;
  };

  isDelete: {
    menuId: string;
    isDelete: boolean;
  };
  rv1100: {
    areaCode: string | undefined;
  };
  pt1105: {
    areaCode: string | undefined;
    cuCode: string | undefined;
    cuName: string | undefined;
    cuJmisu: number | undefined;
  };
  pt1205: {
    areaCode: string | undefined;
    cuCode: string | undefined;
    cuName: string | undefined;
    cuCmisu: number | undefined;
  };
}

const initialState: initialStateType = {
  modalIsOpen: false,
  menu: [],
  type: "",
  cm1105: {
    cuCode: "",
    areaCode: "",
    status: "",
    source: "",
  },
  cm1106: {
    cuCode: "",
    areaCode: "",
    source: "",
    jpName: "",
    jpCode: "",
    custIn: "0",
    custOut: "0",
    jcBasicJaego: "0",
  },
  gr1200Popup: {
    index: undefined,
    areaCode: "",
    bcBuCode: "",
    bcChitType: undefined,
  },
  gr1200: {
    // index: undefined,
    // areaCode: "",
    // bcBuCode: "",
    // bcChitType: "",
    // jpCode: undefined,
    // jpCost: undefined,
    // jpDanga: undefined,
    // jpGubun: undefined,
    // jpKg: undefined,
    // jpName: undefined,
    // jpSvyn: undefined,
    // isProductNameSelected: undefined,
  },
  gr1300: {
    index: undefined,
    areaCode: "",
    bbBuCode: "",
    bbType: "",

    bpName: undefined,
    bpCode: undefined,
    jbuBpDanga: undefined,
    jbuVatKind: undefined,
    isProductNameSelected: undefined,
  },
  cc1100: {
    acjType: undefined,
    accCode: undefined,
    accName: undefined,
    acsCode: undefined,
    acsName: undefined,
  },
  isDelete: {
    menuId: "",
    isDelete: false,
  },
  rv1100: {
    areaCode: undefined,
  },
  pt1105: {
    areaCode: "",
    cuCode: "",
    cuName: "",
    cuJmisu: 0,
  },
  pt1205: {
    areaCode: "",
    cuCode: "",
    cuName: "",
    cuCmisu: 0,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,

  reducers: {
    openModal: (state, actions) => {
      state.modalIsOpen = true;
      state.type = actions.payload.type;
    },

    closeModal: (state) => {
      state.modalIsOpen = false;
      state.type = "";
    },

    addCM1105: (state, action) => {
      state.cm1105.cuCode = action.payload.cuCode;
      state.cm1105.areaCode = action.payload.areaCode;
      state.cm1105.status = action.payload.status;
      state.cm1105.source = action.payload.source;
    },

    addCM1106: (state, action) => {
      state.cm1106.cuCode = action.payload.cuCode;
      state.cm1106.areaCode = action.payload.areaCode;
      state.cm1106.source = action.payload?.source && action.payload.source;
    },

    addCM1106AR1100Tick: (state, action) => {
      state.cm1106 = { ...state.cm1106, ...action.payload };
    },

    addGR1200Popup: (state, action) => {
      state.gr1200Popup.index = action.payload.index;
      state.gr1200Popup.areaCode = action.payload.areaCode;
      state.gr1200Popup.bcBuCode = action.payload.bcBuCode;
      state.gr1200Popup.bcChitType = action.payload.bcChitType;
    },

    addGR1200: (state, action) => {
      // state.gr1200.jpCode = action.payload.jpCode;
      // state.gr1200.jpCost = action.payload.jpCost;
      // state.gr1200.jpDanga = action.payload.jpDanga;
      // state.gr1200.jpGubun = action.payload.jpGubun;
      // state.gr1200.jpKg = action.payload.jpKg;
      // state.gr1200.jpName = action.payload.jpName;
      // state.gr1200.jpSvyn = action.payload.jpSvyn;
      // state.gr1200.isProductNameSelected = action.payload.isProductNameSelected;
      state.gr1200 = { ...action.payload };
    },

    addGR1300: (state, action) => {
      state.gr1300.index = action.payload.index;
      state.gr1300.areaCode = action.payload.areaCode;
      state.gr1300.bbBuCode = action.payload.bbBuCode;
      state.gr1300.bbType = action.payload.bbType;

      state.gr1300.bpName = action.payload.bpName;
      state.gr1300.bpCode = action.payload.bpCode;
      state.gr1300.jbuVatKind = action.payload.jbuVatKind;
      state.gr1300.jbuBpDanga = action.payload.jbuBpDanga;
      state.gr1300.isProductNameSelected = action.payload.isProductNameSelected;
    },
    addCC1100: (state, action) => {
      state.cc1100.acjType = action.payload.acjType;
      state.cc1100.accCode = action.payload.accCode;
      state.cc1100.accName = action.payload.accName;
      state.cc1100.acsCode = action.payload.acsCode;
      state.cc1100.acsName = action.payload.acsName;
    },
    addDeleteMenuId: (state, action) => {
      state.isDelete.menuId = action.payload.menuId;
    },
    setIsDelete: (state, action) => {
      state.isDelete.isDelete = action.payload.isDelete;
    },
    rv1100Popup: (state, actions) => {
      state.rv1100.areaCode = actions.payload.areaCode;
    },
    ptAreaCode: (state, action) => {
      state.pt1105.areaCode = action.payload.areaCode;
      state.pt1105.cuCode = action.payload.cuCode;
      state.pt1105.cuName = action.payload.cuName;
      state.pt1105.cuJmisu = action.payload.cuJmisu;
    },
    pt1205Popup: (state, action) => {
      state.pt1205.areaCode = action.payload.areaCode;
      state.pt1205.cuCode = action.payload.cuCode;
      state.pt1205.cuName = action.payload.cuName;
      state.pt1205.cuCmisu = action.payload.cuCmisu;
    },
  },
});

export const {
  openModal,
  closeModal,
  addCM1105,
  addCM1106,
  addCM1106AR1100Tick,
  addGR1200Popup,
  addGR1200,
  addGR1300,
  addCC1100,
  addDeleteMenuId,
  setIsDelete,
  rv1100Popup,
  ptAreaCode,
  pt1205Popup,
} = modalSlice.actions;

export default modalSlice.reducer;
