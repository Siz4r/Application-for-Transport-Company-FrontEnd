export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  isAvailable: boolean;
}

export interface EmployeeGetAllEmployeesResponse {
  employeeId: string;
  userFirstName: string;
  userLastName: string;
  isAvailable: boolean;
}

export interface EmployeeGetByIdResponse {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: string;

  employeeOrderList: EmployeeOrdersResponse[];
}

export interface EmployeeOrdersResponse {
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

export interface EmployeeGetById {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  orders: EmployeeOrders[];
}

export interface EmployeeOrders {
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
