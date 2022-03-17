import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCompanies } from "./api";
import { Company } from "./types";

interface IcompanySlice {
  companies: Company[];
  loading: boolean;
}

export const companiesSlice = createSlice<IcompanySlice, {}>({
  name: "companies",
  initialState: {
    companies: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
    });

    builder.addMatcher(isAnyOf(getCompanies.pending), (state) => {
      state.loading = true;
    });

    builder.addMatcher(
      isAnyOf(getCompanies.fulfilled, getCompanies.rejected),
      (state) => {
        state.loading = false;
      }
    );
  },
});
