import React, { useState } from "react";
import { useFiles } from "../../core/hooks/Files/useFiles";
import { useSelectUser } from "../../core/hooks/SelectUser/useSelectUser";
import { parseErrorToString } from "../../core/parseErrorToString";
import { isBoolean } from "../../utils/isCheckers/isBooleans";

type Props = {
  id: string | undefined;
  setFormError: (text: string) => void;
};

export const FileForm = (props: Props) => {
  const { user } = useSelectUser();

  const { sendFile } = useFiles({
    fetchOnMount: false,
  });

  const [formError, setFormError] = useState<undefined | string>(undefined);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [selectedFileName, setSelectedFileName] = useState<string | undefined>(
    undefined
  );

  const onSelectImageHandler = (files: FileList | null) => {
    if (files && files.length === 1) {
      const file = files[0];
      const updatedFormData = new FormData();
      updatedFormData.append("file", file as File);
      setSelectedFileName(file.name);
      setFormData(updatedFormData);
    }
  };

  const sendFileSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (props.id && !isBoolean(user) && selectedFileName) {
      try {
        await sendFile({
          formData: formData,
          toId: props.id,
          fromId: user.id,
          senderFirstName: user.firstName,
          senderLastName: user.lastName,
          name: selectedFileName,
        });
      } catch (error) {
        parseErrorToString(error, setFormError);
      }
    }
  };

  return (
    <div className="row">
      <div className="col-7 align-self-center">
        <form
          className="col w-50 ms-auto m-4 text-center"
          id="fileUpdateForm"
          onSubmit={sendFileSubmitHandler}
        >
          {selectedFileName && (
            <p className="mt-2 text-capitalize">
              Selected file: {selectedFileName}
            </p>
          )}
          <label
            htmlFor="file-upload"
            className="rounded bg-dark bg-gradient w-100 text-light p-2"
            style={{ cursor: "pointer" }}
          >
            Select file
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={(e) => onSelectImageHandler(e.currentTarget.files)}
          />
          {formError && (
            <p className="mt-2 text-capitalize text-danger">{formError}</p>
          )}
        </form>
      </div>
      <div className="col-5 ml-2 align-self-center">
        <div className="row">
          <button
            className="p-3 py-4 text-center bg-secondary bg-gradient text-white text-weight-bold rounded"
            form="fileUpdateForm"
            type="submit"
          >
            Send file
          </button>
        </div>
      </div>
    </div>
  );
};
