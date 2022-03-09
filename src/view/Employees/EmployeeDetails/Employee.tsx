import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderComponent } from "../../../components/Order/OrderComponent";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { useEmployees } from "../../../core/hooks/Employees/useEmployees";
import { AuthenticatedView } from "../../../core/wrappers/AuthenticatedView";
import { EmployeeGetById } from "../../../store/Employees/types";
import { EmployeeAndClientOrders } from "../../../store/Orders/types";
import { RouterPathsKeys } from "../../../types";
import { isBoolean } from "../../../utils/isCheckers/isBooleans";
import classes from "./Employee.module.css";

const mapOrders = (isDone: boolean, orders: EmployeeAndClientOrders[]) => {
  return orders
    .filter((o) => o.done === isDone)
    .map((o) => {
      return (
        <OrderComponent
          clientFirstName={o.clientFirstName}
          clientLastName={o.clientLastName}
          employeeFirstName={o.employeeFirstName}
          employeeLastName={o.employeeLastName}
          realized={o.done}
          companyFrom={o.stuffCompanyName}
          stuffName={o.stuffName}
          id={o.id}
          key={o.id}
        ></OrderComponent>
      );
    });
};

export const Employee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchEmployeeById } = useEmployees({
    fetchOnMount: false,
  });
  const [isEmployeeLoading, setIsEmployeeLoading] = useState<boolean>(true);
  let realizedOrders, inRealizationOrders;

  const [employee, setEmployee] = useState<
    boolean | Awaited<ReturnType<typeof fetchEmployeeById>>
  >(false);

  useEffect(() => {
    if (id === undefined) {
      navigate(RouterPathsKeys.EMPLOYEE);
    } else {
      setIsEmployeeLoading(true);
      fetchEmployeeById(id)
        .then((employee) => {
          if (!isBoolean(employee)) {
            setEmployee(employee);
          } else {
            navigate(RouterPathsKeys.EMPLOYEE);
          }
        })
        .finally(() => setIsEmployeeLoading(false));
    }
  }, [fetchEmployeeById, id, navigate]);

  if (!isBoolean(employee)) {
    inRealizationOrders = mapOrders(false, employee.orders);

    realizedOrders = mapOrders(true, employee.orders);
  }

  const employeeData = employee as EmployeeGetById;

  return (
    <AuthenticatedView>
      {!isEmployeeLoading || typeof employee !== "boolean" ? (
        <div className={classes.wrapper}>
          <h2>Employee</h2>
          <div className={classes.container}>
            <div className={classes.person}>
              <div className={classes.pic} />
              <div className={classes.data}>
                <div className={classes.names}>
                  {employeeData.firstName} {employeeData.lastName}
                </div>
                <div className={classes.phoneNumber}>
                  {employeeData.phoneNumber}
                </div>
                <div className={classes.email}>{employeeData.email}</div>
              </div>
              <form>
                <label htmlFor="file-upload" className={classes.fileUpload}>
                  Select file
                </label>
                <input type="file" id="file-upload" />
                <button className={classes.send}>Send file</button>
              </form>
            </div>
            <div className={classes.orders}>
              {employeeData.orders.length > 0 ? (
                <div>
                  <h3>In Realization</h3>
                  {inRealizationOrders}

                  <h3>Done</h3>
                  {realizedOrders}
                </div>
              ) : (
                <h3>This employee hasn't done any orders!</h3>
              )}
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </AuthenticatedView>
  );
};
