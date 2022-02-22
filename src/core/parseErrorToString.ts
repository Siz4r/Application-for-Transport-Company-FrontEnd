export const parseErrorToString = (
  error: any,
  cb: (errorString: string) => void
) => {
  if (typeof error === "object") {
    let string = "";
    Object.entries(error).map(([key, val]) => {
      string = string.concat(`${key}: ${val}\n`);
    });
    cb(string);
  } else {
    cb(error);
  }
};
