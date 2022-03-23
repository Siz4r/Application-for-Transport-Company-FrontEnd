import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";
import { RegisterData } from "../../utils/types";
import { serializeEmployees } from "./serializers/serializeEmployees";
import { serializeSingleEmployee } from "./serializers/serializeSingleEmployee";
import {
  Employee,
  EmployeeGetAllEmployeesResponse,
  EmployeeGetById,
  EmployeeGetByIdResponse,
} from "./types";

export const getEmployees = createAsyncThunk<Employee[], void, {}>(
  "employees/get",
  async (_, thunkAPI) => {
    try {
      const response = await apiFetch<EmployeeGetAllEmployeesResponse[]>(
        `/api/employees/`,
        {
          requestConfig: {
            method: "GET",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return serializeEmployees(response);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEmployeeById = createAsyncThunk<
  EmployeeGetById,
  { id: string },
  {}
>("employees/getById", async ({ id }, thunkAPI) => {
  try {
    const response = await apiFetch<EmployeeGetByIdResponse>(
      `/api/employees/${id}`,
      {
        requestConfig: {
          method: "GET",
          withCredentials: true,
        },
      },
      AuthorizationLevel.AUTHORIZED
    );

    return serializeSingleEmployee(response);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteEmployee = createAsyncThunk<void, { id: string }, {}>(
  "employees/delete",
  async ({ id }, thunkAPI) => {
    try {
      await apiFetch<AxiosResponse>(
        `/api/employees/${id}`,
        {
          requestConfig: {
            method: "DELETE",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addEmployee = createAsyncThunk<string, RegisterData, {}>(
  "employees/add",
  async (data, thunkAPI) => {
    try {
      const response = apiFetch<string>(
        `/api/employees/`,
        {
          requestConfig: {
            withCredentials: true,
            method: "POST",
            data: JSON.stringify(data),
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
