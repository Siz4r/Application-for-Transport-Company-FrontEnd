import { Employee, EmployeeGetAllEmployeesResponse } from "../types";

export const serializeEmployees = (
  apiEmployees: EmployeeGetAllEmployeesResponse[]
): Employee[] => {
  const employees: Employee[] = apiEmployees.map(
    (e) =>
      ({
        firstName: e.userFirstName,
        lastName: e.userLastName,
        id: e.id,
        isAvailable: e.isAvailable,
      } as Employee)
  );
  return employees;
};
