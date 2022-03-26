import dayjs from "dayjs";
import { File, FileResponse } from "../types";

export const serializeFiles = (apiResponse: FileResponse[]): File[] => {
  const files: File[] = apiResponse.map((f) => ({
    ...f,
    createdAt: dayjs(f.createdAt).toDate(),
  }));
  return files;
};
