import { OrderComponent } from "../../components/Order/OrderComponent";
import { useOrders } from "../../core/hooks/Orders/useOrders";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { Order } from "../../store/Orders/types";

import classes from "./Orders.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import useInput from "../../core/hooks/Inputs/useInputs";
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
  const { ordersLoading, fetchOrders, orders } = useOrders({
    fetchOnMount: true,
  });

  const mappedRealizedOrders = mapOrders(true, orders);
  const mappedInRealizationOrders = mapOrders(false, orders);

  return (
    <AuthenticatedView>
      <div className={classes.container}>
        {!ordersLoading ? (
          <React.Fragment>
            <h3>In realization orders</h3>
            {mappedInRealizationOrders}
            <h3>Realized orders</h3>
            {mappedRealizedOrders}
          </React.Fragment>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </AuthenticatedView>
  );
};
