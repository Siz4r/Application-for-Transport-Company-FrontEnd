import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  addEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
} from "../../../store/Employees/api";
import { Employee, EmployeeGetById } from "../../../store/Employees/types";
import { RegisterData } from "../../../utils/types";
import { useTypedDispatch } from "../TypedDispatch/useTypedDispatch";

type UseProjectsConfig = {
  fetchOnMount?: boolean;
};

export const useEmployees = (
  config: UseProjectsConfig | undefined = undefined
) => {
  const typedDispatchGetEmployees = useTypedDispatch<
    typeof getEmployees,
    Employee[]
  >();

  const typedDispatchGetEmployeeById = useTypedDispatch<
    typeof getEmployeeById,
    Required<EmployeeGetById>
  >();

  const typedDispatchDeleteEmployee = useTypedDispatch<
    typeof deleteEmployee,
    Required<EmployeeGetById>
  >();

  const typedDispatchAddEmployee = useTypedDispatch<
    typeof addEmployee,
    string
  >();

  const fetchOnMount = config && config.fetchOnMount === false ? false : true;
  const [employeesLoading, setEmployeesLoading] = useState(
    fetchOnMount ? true : false
  );

  const employees = useSelector<RootState>(({ employees }) => {
    return employees.employees;
  }) as Employee[];

  const fetchEmployees = async (): Promise<Employee[]> => {
    setEmployeesLoading(true);
    const { payload } = await typedDispatchGetEmployees(getEmployees());
    setEmployeesLoading(false);
    return payload;
  };

  const fetchEmployeeById = async (
    id: string
  ): Promise<Required<EmployeeGetById>> => {
    setEmployeesLoading(true);
    const { payload } = await typedDispatchGetEmployeeById(
      getEmployeeById({ id })
    );
    setEmployeesLoading(false);
    return payload;
  };

  const removeEmployee = async (id: string) => {
    setEmployeesLoading(true);
    await typedDispatchDeleteEmployee(deleteEmployee({ id }));
    setEmployeesLoading(false);
  };

  const registerEmployee = async (data: RegisterData) => {
    setEmployeesLoading(true);
    const result = await typedDispatchAddEmployee(addEmployee(data));
    setEmployeesLoading(false);

    if (addEmployee.rejected.match(result)) {
      throw new Error(result.error.message);
    }
  };

  useEffect(() => {
    if (fetchOnMount) {
      try {
        fetchEmployees();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return {
    fetchEmployees,
    fetchEmployeeById,
    removeEmployee,
    registerEmployee,
    employeesLoading,
    employees,
  };
};
