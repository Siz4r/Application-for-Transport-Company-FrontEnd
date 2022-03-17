import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";
import { serializeCompanies } from "./serializers/serializeCompanies";
import { Company, CompanyResponse } from "./types";

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
