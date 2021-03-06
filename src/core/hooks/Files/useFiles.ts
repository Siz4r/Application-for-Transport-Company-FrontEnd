import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getFiles, updateFile } from "../../../store/Files/api";
import { File, UpdateFile } from "../../../store/Files/types";
import { useTypedDispatch } from "../TypedDispatch/useTypedDispatch";

type UseFilesConfig = {
  fetchOnMount?: boolean;
};

export const useFiles = (config: UseFilesConfig | undefined = undefined) => {
  const fetchOnMount = config && config.fetchOnMount === false ? false : true;
  const [fileLoading, setFileLoading] = useState(fetchOnMount ? true : false);

  const typedDispatchUpdateFile = useTypedDispatch<typeof updateFile, string>();
  const typedDispatchGetFiles = useTypedDispatch<typeof getFiles, File[]>();

  const files = useSelector<RootState>(({ files }) => {
    return files.files;
  }) as File[];

  const sendFile = async (data: UpdateFile) => {
    const response = await typedDispatchUpdateFile(updateFile(data));

    if (updateFile.rejected.match(response)) {
      throw response.payload;
    }
  };

  const fetchFiles = async () => {
    setFileLoading(true);
    const { payload } = await typedDispatchGetFiles(getFiles());
    setFileLoading(false);
    return payload;
  };

  useEffect(() => {
    if (fetchOnMount) {
      try {
        fetchFiles();
      } catch (error: any) {
        throw new Error(error);
      }
    }
  }, []);

  return {
    sendFile,
    fetchFiles,
    fileLoading,
    files,
  };
};
