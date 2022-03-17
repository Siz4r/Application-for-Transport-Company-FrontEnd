import { Address } from "../../utils/types";

export interface Company {
  id: string;
  name: string;
  address: Address;
}

export interface CompanyResponse {
  id: string;
  name: string;
  city: string;
  street: string;
  buildingNumber: number;
  postalCode: string;
}
