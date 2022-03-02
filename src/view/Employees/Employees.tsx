import { Link } from "react-router-dom";
import { useEmployees } from "../../core/hooks/Employees/useEmployees";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { RouterPathsKeys } from "../../types";
import classes from "./Employees.module.css";

type Props = {};

export const Employees = (props: Props) => {
  const { employeesLoading, employees } = useEmployees({
    fetchOnMount: true,
  });

  return (
    <AuthenticatedView>
      <div className={classes.container}>
        {!employeesLoading && employees.length < 1 ? (
          <p style={{ fontSize: "5vh" }}>You don't have any employees!</p>
        ) : (
          <ul>
            {employees.map((e) => (
              <li key={e.id}>
                <div className={classes.pic} />
                <div className={classes.employeeData}>
                  {e.firstName} {e.lastName}
                </div>
                <Link
                  to={RouterPathsKeys.EMPLOYEE + e.id}
                  className={classes.link}
                >
                  Employee Details
                </Link>
                <div
                  className={classes.isAvailable}
                  style={{ background: e.isAvailable ? "#20E81C" : "red" }}
                >
                  {e.isAvailable
                    ? "Employee is available"
                    : "Employee isn't available"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AuthenticatedView>
  );
};
