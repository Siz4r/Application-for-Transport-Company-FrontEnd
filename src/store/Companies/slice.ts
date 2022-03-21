import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { isBoolean } from "../../utils/isCheckers/isBooleans";
import {
  addStuffToCompany,
  deleteCompany,
  deleteStuffFromCompany,
  editStuff,
  getCompanies,
  getCompanyById,
} from "./api";
import { Company, CompanyDetails, Stuff } from "./types";

type CompanyEntity = CompanyDetails | boolean;

interface IcompanySlice {
  companies: Company[];
  company: CompanyEntity;
  loading: boolean;
}

export const companiesSlice = createSlice<IcompanySlice, {}>({
  name: "companies",
  initialState: {
    companies: [],
    company: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
    });

    builder.addCase(getCompanyById.fulfilled, (state, action) => {
      state.company = action.payload;
    });

    builder.addCase(addStuffToCompany.fulfilled, (state, action) => {
      if (!isBoolean(state.company)) {
        const stuff: Stuff = {
          ...action.meta.arg,
          id: action.payload,
        };
        state.company.stuffs.push(stuff);
      }
    });

    builder.addCase(deleteStuffFromCompany.fulfilled, (state, action) => {
      if (!isBoolean(state.company)) {
        state.company.stuffs = state.company.stuffs.filter(
          (stuff) => stuff.id !== action.meta.arg.id
        );
      }
    });

    builder.addCase(editStuff.fulfilled, (state, action) => {
      if (!isBoolean(state.company)) {
        let stuff = state.company.stuffs.find(
          (stuff) => stuff.id === action.meta.arg.id
        ) as Stuff;
        const index = state.company.stuffs.indexOf(stuff);
        stuff.prize = action.meta.arg.prize;
        stuff.quantity = action.meta.arg.quantity;
        state.company.stuffs[index] = stuff;
      }
    });

    builder.addCase(deleteCompany.fulfilled, (state, action) => {
      if (!isBoolean(state.company)) {
        state.company = false;
        state.companies = state.companies.filter(
          (c) => c.id !== action.meta.arg.id
        );
      }
    });

    builder.addMatcher(
      isAnyOf(
        getCompanies.pending,
        getCompanyById.pending,
        addStuffToCompany.pending,
        editStuff.pending,
        deleteStuffFromCompany.pending,
        deleteCompany.pending
      ),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        getCompanies.fulfilled,
        getCompanies.rejected,
        getCompanyById.fulfilled,
        getCompanyById.rejected,
        addStuffToCompany.rejected,
        addStuffToCompany.fulfilled,
        deleteStuffFromCompany.rejected,
        deleteStuffFromCompany.fulfilled,
        editStuff.rejected,
        editStuff.fulfilled,
        deleteCompany.rejected,
        deleteCompany.fulfilled
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
