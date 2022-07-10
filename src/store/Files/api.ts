import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch, AuthorizationLevel } from "../../core/apiFetch";
import { serializeFiles } from "./serializers/serializeFiles";
import { File, FileResponse, UpdateFile, UpdateFileResponse } from "./types";

export const updateFile = createAsyncThunk<UpdateFileResponse, UpdateFile, {}>(
  "files/update",
  async (data, thunkAPI) => {
    try {
      const response = await apiFetch<UpdateFileResponse>(
        `/api/files/${data.toId}`,
        {
          requestConfig: {
            data: data.formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            method: "POST",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFiles = createAsyncThunk<File[], void, {}>(
  "files/get",
  async (_, thunkAPI) => {
    try {
      const response = await apiFetch<FileResponse[]>(
        "/api/files/",
        {
          requestConfig: {
            method: "GET",
            withCredentials: true,
          },
        },
        AuthorizationLevel.AUTHORIZED
      );

      return serializeFiles(response);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
