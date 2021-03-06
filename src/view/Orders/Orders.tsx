import { OrderComponent } from "../../components/Order/OrderComponent";
import { useOrders } from "../../core/hooks/Orders/useOrders";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { Order } from "../../store/Orders/types";

import classes from "./Orders.module.css";
import React from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const mapOrders = (isDone: boolean, orders: Order[]) => {
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
          companyFrom={o.companyName}
          stuffName={o.stuffName}
          id={o.id}
          key={o.id}
        />
      );
    });
};

export const Orders = () => {
  const { ordersLoading, orders } = useOrders({
    fetchOnMount: true,
  });

  const mappedRealizedOrders = mapOrders(true, orders);
  const mappedInRealizationOrders = mapOrders(false, orders);

  return (
    <AuthenticatedView>
      <div className={classes.container}>
        {!ordersLoading ? (
          orders.length >= 1 ? (
            <React.Fragment>
              <h3>Zamówienia w trakcie realizacji</h3>
              {mappedInRealizationOrders}
              <h3>Zrealizowane zamówienia</h3>
              {mappedRealizedOrders}
            </React.Fragment>
          ) : (
            <p style={{ fontSize: "5vh" }}>
              Nie otrzymałeś na ten moment żadnego zamówienia!
            </p>
          )
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </AuthenticatedView>
  );
};
