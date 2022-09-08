import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "api/index";

export interface initialStateType {
  loading: boolean;
  employees: any;
}

const initialState: initialStateType = {
  loading: false,
  employees: [],
};

export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async () => {
    const response = await API.get("employee/list");
    return response.data as any;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee: any) => {
    const response = await API.post("employee/action/create", employee);
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (employee: any) => {
    const response = await API.post(`employee/action/delete`, employee);
    if (response?.status === 200) return employee;
    return `${response?.status}: ${response?.statusText}`;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employee: any) => {
    const response = await API.post(`employee/action/update`, employee);
    if (response?.status === 200) return employee;
    return `${response?.status}: ${response?.statusText}`;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: initialState,

  extraReducers: (builder) => {
    builder.addCase(
      getEmployees.fulfilled,
      (state: initialStateType, action: any) => {
        state.loading = true;
        state.employees = action.payload;
      }
    );
  },
  reducers: {},
});

export default employeeSlice.reducer;
