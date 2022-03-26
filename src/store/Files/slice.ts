import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getFiles, updateFile } from "./api";

interface IfilesSlice {
  files: any;
  loading: boolean;
}

export const filesSlice = createSlice<IfilesSlice, {}>({
  name: "files",
  initialState: {
    loading: false,
    files: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateFile.fulfilled, (state, action) => {
      state.files = [
        ...state.files,
        {
          ...action.payload,
          ...action.meta.arg,
          createdAt: new Date(),
        },
      ];
    });

    builder.addCase(getFiles.fulfilled, (state, action) => {
      console.log(action.payload);
      state.files = action.payload;
    });

    builder.addMatcher(
      isAnyOf(updateFile.pending, getFiles.pending),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        updateFile.fulfilled,
        updateFile.rejected,
        getFiles.rejected,
        getFiles.fulfilled
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});
