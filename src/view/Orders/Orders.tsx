import { OrderComponent } from "../../components/Order/OrderComponent";
import { useOrders } from "../../core/hooks/Orders/useOrders";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { Order } from "../../store/Orders/types";

import classes from "./Orders.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import useInput from "../../core/hooks/Inputs/useInputs";

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

  const { value: quantity, valueChangeHandler: quantityChangeHandler } =
    useInput(() => {
      return true;
    }, "100");

  const [isOpenModal, setIsOpenModal] = useState(false);

  const mappedRealizedOrders = mapOrders(true, orders);
  const mappedInRealizationOrders = mapOrders(false, orders);

  return (
    <AuthenticatedView>
      <div className={classes.container}>
        <h3>In realization orders</h3>
        {mappedInRealizationOrders}
        <h3>Realized orders</h3>
        {mappedRealizedOrders}

        <Button
          onClick={() => setIsOpenModal(true)}
          style={{ position: "absolute", bottom: 0, right: 0, fontSize: 30 }}
          className="m-3 px-5 w-25"
        >
          Add order
        </Button>

        <Modal show={isOpenModal} onHide={() => setIsOpenModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Choose the stuff</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Company: </Form.Label>
              <Form.Select className="mt-0">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              <Form.Label className="mt-2">Stuff</Form.Label>
              <Form.Select className="mt-0">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              <Form.Label className="mt-2">Quantity: {quantity}</Form.Label>
              <Form.Range
                min={10}
                max={200}
                onChange={quantityChangeHandler}
                value={quantity}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AuthenticatedView>
  );
};
