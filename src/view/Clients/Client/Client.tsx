import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderComponent } from "../../../components/Order/OrderComponent";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { useClients } from "../../../core/hooks/Clients/useClients";
import { AuthenticatedView } from "../../../core/wrappers/AuthenticatedView";
import { EmployeeGetById } from "../../../store/Employees/types";
import { EmployeeAndClientOrders } from "../../../store/Orders/types";
import { RouterPathsKeys } from "../../../types";
import { isBoolean } from "../../../utils/isCheckers/isBooleans";
import classes from "./Client.module.css";

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

export const Client = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchClientById } = useClients({
    fetchOnMount: false,
  });
  const [isClientLoading, setIsClientLoading] = useState<boolean>(true);
  let realizedOrders, inRealizationOrders;

  const [client, setClient] = useState<
    boolean | Awaited<ReturnType<typeof fetchClientById>>
  >(false);

  useEffect(() => {
    if (id === undefined) {
      navigate(RouterPathsKeys.CLIENT);
    } else {
      setIsClientLoading(true);
      fetchClientById(id)
        .then((client) => {
          if (!isBoolean(client)) {
            setClient(client);
          } else {
            navigate(RouterPathsKeys.CLIENT);
          }
        })
        .finally(() => setIsClientLoading(false));
    }
  }, []);

  if (!isBoolean(client)) {
    inRealizationOrders = mapOrders(false, client.orders);

    realizedOrders = mapOrders(true, client.orders);
  }

  const clientData = client as EmployeeGetById;

  return (
    <AuthenticatedView>
      {!isClientLoading || typeof client !== "boolean" ? (
        <div className={classes.wrapper}>
          <h2>Client</h2>
          <div className={classes.container}>
            <div className={classes.person}>
              <div className={classes.pic} />
              <div className={classes.data}>
                <div className={classes.names}>
                  {clientData.firstName} {clientData.lastName}
                </div>
                <div className={classes.phoneNumber}>
                  {clientData.phoneNumber}
                </div>
                <div className={classes.email}>{clientData.email}</div>
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
              {clientData.orders.length > 0 ? (
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
