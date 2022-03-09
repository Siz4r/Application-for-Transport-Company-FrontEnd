import {
  EmployeeAndClientOrders,
  EmployeeAndClientOrdersResponse,
} from "../Orders/types";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  isAvailable: boolean;
}

export interface EmployeeGetByIdResponse {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: string;

  orderList: EmployeeAndClientOrdersResponse[];
}

export interface EmployeeGetById {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  orders: EmployeeAndClientOrders[];
}

export interface EmployeeGetAllEmployeesResponse {
  employeeId: string;
  userFirstName: string;
  userLastName: string;
  isAvailable: boolean;
}
