import { AuthenticatedView } from "../../../core/wrappers/AuthenticatedView";
import "./OrderDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOrders } from "../../../core/hooks/Orders/useOrders";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RouterPathsKeys } from "../../../types";
import { isBoolean } from "../../../utils/isCheckers/isBooleans";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import useInput from "../../../core/hooks/Inputs/useInputs";
import { Input } from "../../../components/UI/Input";
import { parseErrorToString } from "../../../core/parseErrorToString";
import { useEmployees } from "../../../core/hooks/Employees/useEmployees";
import { Employee } from "../../../store/Orders/types";
import { WarningModal } from "../../../components/Modals/warningModal";
import { Form } from "react-bootstrap";
import { useSelectUser } from "../../../core/hooks/SelectUser/useSelectUser";

const hasOnlyNumbers = (value: string) => /^\d+$/.test(value);
const quantityValidation = (value: string) =>
  hasOnlyNumbers(value) && parseInt(value) >= 0;

export const OrderDetails = () => {
  const { role } = useSelectUser();
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);

  const {
    fetchOrderById,
    updateOrderQuantity,
    assigneEmployee,
    updateOrderState,
  } = useOrders({
    fetchOnMount: false,
  });

  const { employees, fetchEmployees } = useEmployees({
    fetchOnMount: true,
  });

  const [freeEmployees, setFreeEmployees] = useState<Employee[]>([]);
  const [isOrderLoading, setIsOrderLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<
    boolean | Awaited<ReturnType<typeof fetchOrderById>>
  >(false);
  const [orderUpdated, setOrderUpdated] = useState<undefined | string>(
    undefined
  );

  const {
    value: quantityValue,
    isValid: quantityIsValid,
    hasError: quantityHasError,
    valueChangeHandler: quantityChangeHandler,
    inputBlurHandler: quantityBlurHandler,
    setValue: quantitySetValue,
  } = useInput(quantityValidation, "0");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) {
      navigate(RouterPathsKeys.ORDER);
    } else {
      setIsOrderLoading(true);
      fetchOrderById(id)
        .then((order) => {
          if (!isBoolean(order)) {
            setOrder(order);
            quantitySetValue(order.quantity.toString());
            console.log(employees);
            setFreeEmployees([...employees.filter((e) => e.isAvailable)]);
          } else {
            navigate(RouterPathsKeys.ORDER);
          }
        })
        .finally(() => setIsOrderLoading(false));
    }
  }, []);

  const updateOrder = async () => {
    if (id !== undefined && quantityIsValid && !isBoolean(order)) {
      try {
        await updateOrderQuantity(id, parseInt(quantityValue));
        if (parseInt(quantityValue) === 0) {
          setOrder({ ...order, done: true });
        }
        setOrderUpdated("Zamówienie zostało zaktualizowane!");
        setFormError(undefined);
      } catch (error: any) {
        parseErrorToString(error.toString(), setFormError);
        setOrderUpdated(undefined);
      }
    }
  };

  const changeOrderState = async () => {
    if (id !== undefined && !isBoolean(order)) {
      try {
        await updateOrderState(id);
        setOrder({ ...order, done: !order.done });
        await fetchEmployees();
      } catch (error: any) {
        parseErrorToString(error, setFormError);
      }
    }
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (employee && id && !isBoolean(order)) {
      try {
        await assigneEmployee(id, employee);
        setOrder({ ...order, employee: employee });
        await fetchEmployees();
      } catch (error: any) {
        parseErrorToString(error, setFormError);
      }
    }
  };

  const getEmployee = (event: React.FormEvent<HTMLSelectElement>) => {
    setEmployee(
      freeEmployees.filter((e) => e.id === event.currentTarget.value).at(0)
    );
  };

  if (isBoolean(order)) {
    return <LoadingSpinner />;
  }

  if (freeEmployees.length > 0 && !employee) {
    setEmployee(freeEmployees[0]);
  }

  const isDoneClasses = order.done ? "text-success" : "text-danger";

  return (
    <AuthenticatedView>
      {!isOrderLoading && typeof order !== "boolean" ? (
        <div className="container">
          <h2>Firma i towar:</h2>
          <div className="row shadowBox mx-3">
            <div className="col-4 p-0">
              <div className="row p-4">
                <div className="col align-self-start" style={{ maxWidth: 190 }}>
                  <img
                    src="https://res.cloudinary.com/siz4rimag/image/upload/v1646418562/443-4432362_fabric-fabric-icon-png-transparent-png_1_xkyvh4.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col align-self-center mx-3 text-center">
                  <strong>
                    <h3 className="mt-3">{order.company.name}</h3>
                  </strong>

                  <div>
                    <p className="mb-0 mt-2 text-secondary">
                      {order.company.address.street}{" "}
                      {order.company.address.buildingNumber}
                    </p>
                    <p className="text-secondary">
                      {order.company.address.postalCode}{" "}
                      {order.company.address.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col align-self-center px-4">
              <div className="row">
                <div className="col">
                  <h2 className="text-center">
                    Zamówienie na: <br />
                    {order.stuffName}
                  </h2>
                </div>
                <div className="col w-100 text-center">
                  <Input
                    id="quantity"
                    placeholder="Ilość"
                    type="number"
                    labelText="Ilość:"
                    value={quantityValue}
                    onChange={quantityChangeHandler}
                    onBlur={quantityBlurHandler}
                    hasError={quantityHasError}
                    disabled={role === "Employees"}
                  />
                </div>
              </div>
            </div>
            {role !== "Employees" && (
              <div className="col align-self-center text-center">
                {formError && (
                  <h3 className="text-danger text-center mb-0">{formError}</h3>
                )}
                {orderUpdated && (
                  <h3 className="text-success text-center mb-0">
                    {orderUpdated}
                  </h3>
                )}
                <button
                  className="text-center m-4 px-5 bg-warning"
                  onClick={updateOrder}
                >
                  Aktualizuj zamówienie
                </button>
                <h1 className={isDoneClasses}>Wykonane</h1>
              </div>
            )}
          </div>

          <h2 className="mt-3">Klient:</h2>

          <div className="row shadowBox mx-3">
            <div className="col-4 p-0">
              <div className="row p-4">
                <div className="col align-self-start" style={{ maxWidth: 190 }}>
                  <img
                    src="https://res.cloudinary.com/siz4rimag/image/upload/v1643390736/443-4432362_fabric-fabric-icon-png-transparent-png_1_euwyic.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col align-self-center mx-3 text-center">
                  <strong>
                    <h3 className="mt-3">
                      {order.client.firstName} {order.client.lastName}
                    </h3>
                  </strong>
                  {order.client.address.buildingNumber !== 0 ? (
                    <div>
                      <p className="mb-0 mt-2 text-secondary">
                        {order.client.address.street}{" "}
                        {order.client.address.buildingNumber}
                      </p>
                      <p className="text-secondary">
                        {order.client.address.postalCode}{" "}
                        {order.client.address.city}
                      </p>
                    </div>
                  ) : (
                    <p>Klient nie ustawił jeszcze swojego adresu!</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col align-self-center text-center">
              <h1>{order.client.phoneNumber}</h1>
            </div>
            <div className="col align-self-center text-center">
              <h1>
                Data zamówienia: <br />
                {order.orderDate.toLocaleDateString()}
              </h1>
            </div>
          </div>

          <h2 className="mt-3">Pracownik:</h2>
          <div className="row shadowBox mx-3">
            <div className="col-4 p-0">
              <div className="row p-4">
                <div className="col align-self-start" style={{ maxWidth: 190 }}>
                  <img
                    src="https://res.cloudinary.com/siz4rimag/image/upload/v1644853870/443-4432362_fabric-fabric-icon-png-transparent-png_1_1_uv5fgp.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col align-self-center mx-3 text-center">
                  <strong>
                    {order.employee.firstName ? (
                      <h3 className="mt-3">
                        {order.employee.firstName} {order.employee.lastName}
                      </h3>
                    ) : (
                      <p>
                        To zamówienie nie ma jeszcze przypisanego pracownika!
                      </p>
                    )}
                  </strong>
                  <p className="mb-0 mt-2 text-secondary">
                    {order.employee.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
            {role === "Admins" && (
              <Fragment>
                <form
                  className="col align-items-start"
                  onSubmit={submitHandler}
                  id="newEmployee"
                >
                  <div className="row mt-4">
                    <label
                      htmlFor="employee-choice"
                      className="bg-white border-0 text-center"
                    >
                      Wybierz pracownika
                    </label>
                    <Form.Select
                      id="employees"
                      className="text-center mt-2"
                      onChange={getEmployee}
                    >
                      {freeEmployees.length > 0 ? (
                        freeEmployees.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.firstName} {e.lastName}
                          </option>
                        ))
                      ) : (
                        <option key="0" value="">
                          Nie ma wolnych pracowników!
                        </option>
                      )}
                    </Form.Select>

                    <WarningModal
                      onClick={() => {}}
                      body="Czy jesteś pewny, że chcesz przypisać pracownika do zamówienia? Gdy to zrobisz nie będziesz mógł pozostawić operacji bez robotnika!"
                      buttonBody="Przypisz"
                      style="mt-4 py-2 bg-secondary bg-gradient text-white text-weight-bold"
                      formId="newEmployee"
                      disableButton={freeEmployees.length === 0}
                    />
                  </div>
                </form>
                <div className="col align-self-center text-center">
                  <button
                    onClick={changeOrderState}
                    className={`mt-0 p-4 bg-${
                      order.done ? "danger" : "success"
                    } bg-gradient text-white`}
                  >
                    <h3 className="p-0">
                      {order.done
                        ? "Ustaw jako niewykonane"
                        : "Ustaw jako wykonane"}
                    </h3>
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </AuthenticatedView>
  );
};
