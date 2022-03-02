import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "../../../components/Order/Order";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { useEmployees } from "../../../core/hooks/Employees/useEmployees";
import { AuthenticatedView } from "../../../core/wrappers/AuthenticatedView";
import { EmployeeGetById } from "../../../store/Employees/types";
import { RouterPathsKeys } from "../../../types";
import { isBoolean } from "../../../utils/isCheckers/isBooleans";
import classes from "./Employee.module.css";

type Props = {};

const ORDERS = [
  {
    id: "0",
    clientFirstName: "Juliusz",
    clientLastName: "Slowacki",
    companyFrom: "Gazprom Białystok",
    companyTo: "Pelet Sokółka",
    stuffName: "Pelet",
    inRealization: true,
  },
  {
    id: "1",
    clientFirstName: "Juliusz",
    clientLastName: "Slowacki",
    companyFrom: "Gazprom Białystok",
    companyTo: "Pelet Sokółka",
    stuffName: "Drewno",
    inRealization: false,
  },
  {
    id: "2",
    clientFirstName: "Juliusz",
    clientLastName: "Slowacki",
    companyFrom: "Gazprom Białystok",
    companyTo: "Pelet Sokółka",
    stuffName: "Drewno",
    inRealization: true,
  },
  {
    id: "2",
    clientFirstName: "Juliusz",
    clientLastName: "Slowacki",
    companyFrom: "Gazprom Białystok",
    companyTo: "Pelet Sokółka",
    stuffName: "Drewno",
    inRealization: true,
  },
];

export const Employee = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEmployeeLoading, setIsEmployeeLoading] = useState<boolean>(true);
  const { fetchEmployeeById, employeesLoading } = useEmployees({
    fetchOnMount: false,
  });
  let realizedOrders, inRealizationOrders;

  const [employee, setEmployee] = useState<
    boolean | Awaited<ReturnType<typeof fetchEmployeeById>>
  >(false);

  useEffect(() => {
    if (id === undefined) {
      navigate(RouterPathsKeys.EMPLOYEES);
    } else {
      setIsEmployeeLoading(true);
      fetchEmployeeById(id)
        .then((employee) => {
          if (!isBoolean(employee)) {
            setEmployee(employee);
          } else {
            navigate(RouterPathsKeys.EMPLOYEES);
          }
        })
        .finally(() => setIsEmployeeLoading(false));
    }
  }, []);

  if (!isBoolean(employee)) {
    inRealizationOrders = employee.orders
      .filter((o) => o.done === false)
      .map((o) => {
        return (
          <Order
            clientFirstName={o.clientFirstName}
            clientLastName={o.clientLastName}
            key={o.id}
            companyFrom={o.stuffCompanyName}
            stuffName={o.stuffName}
            realized={o.done}
          />
        );
      });

    realizedOrders = employee.orders
      .filter((o) => o.done === true)
      .map((o) => {
        return (
          <Order
            clientFirstName={o.clientFirstName}
            clientLastName={o.clientLastName}
            key={o.id}
            companyFrom={o.stuffCompanyName}
            stuffName={o.stuffName}
            realized={o.done}
          />
        );
      });
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
