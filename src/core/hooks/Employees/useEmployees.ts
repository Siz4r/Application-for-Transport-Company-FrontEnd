import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getEmployeeById, getEmployees } from "../../../store/Employees/api";
import { Employee, EmployeeGetById } from "../../../store/Employees/types";
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
    employeesLoading,
    employees,
  };
};
