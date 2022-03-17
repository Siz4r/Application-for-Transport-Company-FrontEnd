import { Company, CompanyResponse } from "../types";

export const serializeCompanies = (
  apiCompanies: CompanyResponse[]
): Company[] => {
  return apiCompanies.map(
    (c) =>
      ({
        ...c,
        address: {
          ...c,
        },
      } as Company)
  );
};
