import { CompanyDetails, CompanyGetByIdResponse } from "../types";

export const serializeCompanyDetails = (
  apiResponse: CompanyGetByIdResponse
): CompanyDetails => {
  return {
    ...apiResponse,
    stuffs: apiResponse.stuffList,
  };
};
