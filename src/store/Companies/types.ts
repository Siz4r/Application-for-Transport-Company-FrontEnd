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

export interface CompanyDetails {
  id: string;
  name: string;
  city: string;
  street: string;
  buildingNumber: number;
  postalCode: string;
  stuffs: Stuff[];
}

export interface CompanyGetByIdResponse {
  id: string;
  name: string;
  city: string;
  street: string;
  buildingNumber: number;
  postalCode: string;
  stuffList: Stuff[];
}

export interface Stuff {
  id: string;
  name: string;
  description: string;
  quantity: number;
  prize: number;
}

export interface AddStuffData {
  prize: number;
  quantity: number;
  description: string;
  name: string;
  companyId: string;
}

export interface AddCompanyData {
  name: string;
  city: string;
  street: string;
  buildingNumber: number;
  postalCode: string;
}
