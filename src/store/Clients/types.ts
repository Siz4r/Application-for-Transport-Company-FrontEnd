import {
  EmployeeAndClientOrders,
  EmployeeAndClientOrdersResponse,
} from "../Orders/types";

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ClientListResponse {
  clientId: string;
  userFirstName: string;
  userLastName: string;
}

export interface ClientGetById {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  orders: EmployeeAndClientOrders[];
}

export interface ClientGetByIdResponse {
  id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: string;

  orderList: EmployeeAndClientOrdersResponse[];
}
