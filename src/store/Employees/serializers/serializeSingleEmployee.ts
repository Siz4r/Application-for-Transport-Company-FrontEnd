import { EmployeeAndClientOrders } from "../../Orders/types";
import { EmployeeGetById, EmployeeGetByIdResponse } from "../types";

export const serializeSingleEmployee = (
  apiEmployee: EmployeeGetByIdResponse
): EmployeeGetById => {
  const employee: EmployeeGetById = {
    id: apiEmployee.id,
    firstName: apiEmployee.userFirstName,
    lastName: apiEmployee.userLastName,
    phoneNumber: apiEmployee.userPhoneNumber,
    email: apiEmployee.userEmail,

    orders: apiEmployee.orderList.map(
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
