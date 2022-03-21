import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";
import { serializeCompanies } from "./serializers/serializeCompanies";
import { serializeCompanyDetails } from "./serializers/serializeCompanyDetails";
import {
  AddStuffData,
  Company,
  CompanyDetails,
  CompanyGetByIdResponse,
  CompanyResponse,
} from "./types";

export const getCompanies = createAsyncThunk<Company[], void, {}>(
  "companies/get",
  async (_, thunkAPI) => {
    try {
      const response = await apiFetch<CompanyResponse[]>(
        `/api/companies/`,
        {
          requestConfig: {
            method: "GET",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return serializeCompanies(response);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCompanyById = createAsyncThunk<
  CompanyDetails,
  { id: string },
  {}
>("companies/getById", async ({ id }, thunkAPI) => {
  try {
    const response = await apiFetch<CompanyGetByIdResponse>(
      `/api/companies/${id}`,
      {
        requestConfig: {
          method: "GET",
          withCredentials: true,
        },
      },
      AuthorizationLevel.AUTHORIZED
    );

    return serializeCompanyDetails(response);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addStuffToCompany = createAsyncThunk<string, AddStuffData, {}>(
  "companies/addStuff",
  async (stuffData, thunkAPI) => {
    try {
      const result = await apiFetch<string>(
        `/api/stuffs/`,
        {
          requestConfig: {
            method: "POST",
            withCredentials: true,
            data: JSON.stringify(stuffData),
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteStuffFromCompany = createAsyncThunk<
  void,
  { id: string },
  {}
>("companies/deleteStuff", async ({ id }, thunkAPI) => {
  try {
    await apiFetch(
      `/api/stuffs/${id}`,
      {
        requestConfig: {
          method: "DELETE",
          withCredentials: true,
        },
      },
      AuthorizationLevel.AUTHORIZED
    );
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const editStuff = createAsyncThunk<
  void,
  { quantity: number; prize: number; id: string },
  {}
>("companies/editStuff", async ({ quantity, prize, id }, thunkAPI) => {
  try {
    await apiFetch(
      `/api/stuffs/${id}`,
      {
        requestConfig: {
          method: "PUT",
          withCredentials: true,
          data: JSON.stringify({
            quantity,
            prize,
          }),
        },
      },
      AuthorizationLevel.AUTHORIZED
    );
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteCompany = createAsyncThunk<void, { id: string }, {}>(
  "companie/delete",
  async ({ id }, thunkAPI) => {
    try {
      return await apiFetch(
        `/api/companies/${id}`,
        {
          requestConfig: {
            method: "DELETE",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
