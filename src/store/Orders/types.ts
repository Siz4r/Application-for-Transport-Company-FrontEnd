import { Address } from "../../utils/types";

export interface OrderDetailsResponse {
  id: string;
  client: ClientResponse;
  employee: EmployeeResponse;
  stuff: {
    name: string;
    company: {
      name: string;
      city: string;
      street: string;
      postalCode: string;
      buildingNumber: number;
    };
  };
  date: string;
  amount: number;
  done: boolean;
}

export interface EmployeeResponse {
  employeeId: string;
  userFirstName: string;
  userLastName: string;
  userPhoneNumber: string;
}

export interface ClientResponse {
  userFirstName: string;
  userLastName: string;
  userPhoneNumber: string;
  userStreet: string;
  userCity: string;
  userPostalCode: string;
  userBuildingNumber: number;
}

export interface OrderDetails {
  id: string;
  company: Company;
  employee: Employee;
  client: Client;
  stuffName: string;
  quantity: number;
  done: boolean;
  orderDate: Date;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface Client {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
}

export interface Company {
  name: string;
  address: Address;
}

export interface Order {
  id: string;
  done: boolean;
  stuffName: string;
  companyName: string;
  clientFirstName: string;
  clientLastName: string;
  employeeFirstName: string;
  employeeLastName: string;
}

export interface OrderResponse {
  id: string;
  done: boolean;
  stuffName: string;
  stuffCompanyName: string;
  clientUserFirstName: string;
  clientUserLastName: string;
  employeeUserFirstName: string;
  employeeUserLastName: string;
}

export interface EmployeeAndClientOrders {
  id: string;
  clientFirstName: string;
  clientLastName: string;
  employeeFirstName: string;
  employeeLastName: string;
  stuffName: string;
  stuffCompanyName: string;
  done: boolean;
  amount: number;
}

export interface EmployeeAndClientOrdersResponse {
  id: string;
  clientUserFirstName: string;
  clientUserLastName: string;
  employeeUserFirstName: string;
  employeeUserLastName: string;
  stuffName: string;
  stuffCompanyName: string;
  done: boolean;
  amount: number;
}
