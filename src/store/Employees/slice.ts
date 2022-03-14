import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { isBoolean } from "../../utils/isCheckers/isBooleans";
import { deleteEmployee, getEmployeeById, getEmployees } from "./api";
import { Employee, EmployeeGetById } from "./types";

export type EmployeeEntity = EmployeeGetById | boolean;

interface IemployeesSlice {
  employees: Employee[];
  employee: EmployeeEntity;
  loading: boolean;
}

export const employeesSlice = createSlice<IemployeesSlice, {}>({
  name: "employees",
  initialState: {
    employees: [],
    employee: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
    });

    builder.addCase(getEmployeeById.fulfilled, (state, action) => {
      state.employee = action.payload;
    });

    builder.addCase(deleteEmployee.fulfilled, (state) => {
      if (!isBoolean(state.employee)) {
        const employee = state.employee;
        state.employees = state.employees.filter((e) => e.id !== employee.id);
      }
      state.employee = false;
    });

    builder.addMatcher(
      isAnyOf(
        getEmployees.pending,
        getEmployeeById.pending,
        deleteEmployee.pending
      ),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getEmployees.fulfilled,
        getEmployees.rejected,
        getEmployeeById.fulfilled,
        getEmployeeById.rejected,
        deleteEmployee.rejected,
        deleteEmployee.fulfilled
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
