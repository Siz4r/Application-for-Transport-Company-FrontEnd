import {
  EmployeeAndClientOrders,
  EmployeeAndClientOrdersResponse,
} from "../Orders/types";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isAvailable: boolean;
}

export interface EmployeeGetByIdResponse {
  id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: string;

  orderList: EmployeeAndClientOrdersResponse[];
}

export interface EmployeeGetById {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  orders: EmployeeAndClientOrders[];
}

export interface EmployeeGetAllEmployeesResponse {
  id: string;
  userFirstName: string;
  userLastName: string;
  userPhoneNumber: string;
  isAvailable: boolean;
}
