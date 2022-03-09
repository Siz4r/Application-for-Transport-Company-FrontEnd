import { EmployeeAndClientOrders } from "../../Orders/types";
import { ClientGetById, ClientGetByIdResponse } from "../types";

export const serializeSingleClient = (
  apiClient: ClientGetByIdResponse
): ClientGetById => {
  const employee: ClientGetById = {
    firstName: apiClient.userFirstName,
    lastName: apiClient.userLastName,
    phoneNumber: apiClient.userPhoneNumber,
    email: apiClient.userEmail,

    orders: apiClient.orderList.map(
      (e) =>
        ({
          clientFirstName: e.clientUserFirstName,
          clientLastName: e.clientUserLastName,
          employeeFirstName: e.employeeUserFirstName,
          employeeLastName: e.employeeUserLastName,
          done: e.done,
          stuffName: e.stuffName,
          stuffCompanyName: e.stuffCompanyName,
          id: e.id,
        } as EmployeeAndClientOrders)
    ),
  };
  return employee;
};
