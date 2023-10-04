import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployees = createAsyncThunk('main/fetchEmployees', async () => {
  const response = await axios.get('http://localhost:8080/company/employees');
  return response.data;
});

export const deleteEmployee = createAsyncThunk('main/deleteEmployee', async (empId) => {
  await axios.delete(`http://localhost:8080/company/employees/${empId}`);
  return empId;
});

const mainSlice = createSlice({
  name: 'main',
  initialState: { employee: [] },
  reducers: {
    addEmployee: (state, action) => {
      state.employee.push(action.payload);
    },
    removeEmployee: (state, action) => {
      state.employee = state.employee.filter((employee) => employee.empId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employee = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employee = state.employee.filter((employee) => employee.empId !== action.payload);
      });
  },
});

export const { addEmployee, removeEmployee } = mainSlice.actions;
export default mainSlice.reducer;
