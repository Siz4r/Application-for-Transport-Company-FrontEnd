import { AuthenticatedView } from "../../../core/wrappers/AuthenticatedView";
import "./OrderDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOrders } from "../../../core/hooks/Orders/useOrders";
import { useEffect, useState } from "react";
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

const hasOnlyNumbers = (value: string) => /^\d+$/.test(value);
const quantityValidation = (value: string) =>
  hasOnlyNumbers(value) && parseInt(value) > 0;

export const OrderDetails = () => {
  const [formError, setFormError] = useState<string | undefined>(undefined);
  let employee: Employee | undefined;

  const {
    fetchOrderById,
    updateOrderQuantity,
    assigneEmployee,
    updateOrderState,
  } = useOrders({
    fetchOnMount: false,
  });

  const { employees } = useEmployees({
    fetchOnMount: true,
  });
  const [isOrderLoading, setIsOrderLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<
    boolean | Awaited<ReturnType<typeof fetchOrderById>>
  >(false);

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
          } else {
            navigate(RouterPathsKeys.ORDER);
          }
        })
        .finally(() => setIsOrderLoading(false));
    }
  }, []);

  const updateOrder = () => {
    if (id !== undefined && quantityIsValid) {
      try {
        updateOrderQuantity(id, parseInt(quantityValue));
      } catch (error: any) {
        parseErrorToString(error, setFormError);
      }
    }
  };

  const changeOrderState = () => {
    if (id !== undefined && !isBoolean(order)) {
      try {
        updateOrderState(id);
        setOrder({ ...order, done: !order.done });
      } catch (error: any) {
        parseErrorToString(error, setFormError);
      }
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (employee && id && !isBoolean(order)) {
      try {
        assigneEmployee(id, employee);
        setOrder({ ...order, employee: employee });
      } catch (error: any) {
        parseErrorToString(error, setFormError);
      }
    }
  };

  const getEmployee = (event: React.FormEvent<HTMLInputElement>) => {
    employee = employees
      .filter(
        (e) =>
          e.firstName === event.currentTarget.value.split(" ")[0] &&
          e.lastName === event.currentTarget.value.split(" ")[1]
      )
      .at(0);
  };

  if (isBoolean(order)) {
    return <LoadingSpinner />;
  }

  const isDoneClasses = order.done ? "text-success" : "text-danger";

  return (
    <AuthenticatedView>
      {!isOrderLoading && typeof order !== "boolean" ? (
        <div className="container">
          <h2>Company and Stuff:</h2>
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
                  {order.company.address.buildingNumber !== 0 ? (
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
                  ) : (
                    <p>Company hasn't yet setted it's own address!</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col align-self-center px-4">
              <div className="row">
                <div className="col">
                  <h2 className="text-center">
                    Order on: <br />
                    {order.stuffName}
                  </h2>
                </div>
                <div className="col w-100 text-center">
                  <Input
                    id="quantity"
                    placeholder="Quantity"
                    type="number"
                    labelText="Quantity:"
                    value={quantityValue}
                    onChange={quantityChangeHandler}
                    onBlur={quantityBlurHandler}
                    hasError={quantityHasError}
                  />
                </div>
              </div>
            </div>
            <div className="col align-self-center text-center">
              <button
                className="text-center m-4 px-5 bg-warning"
                onClick={updateOrder}
              >
                Update order
              </button>
              <h1 className={isDoneClasses}>DONE</h1>
            </div>
          </div>

          <h2 className="mt-3">Client:</h2>

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
                    <p>Client hasn't yet setted it's own address!</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col align-self-center text-center">
              <h1>{order.client.phoneNumber}</h1>
            </div>
            <div className="col align-self-center text-center">
              <h1>
                Order date: <br />
                {order.orderDate.toLocaleDateString()}
              </h1>
            </div>
          </div>

          <h2 className="mt-3">Employee:</h2>
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
                    <h3 className="mt-3">
                      {order.employee.firstName} {order.employee.lastName}
                    </h3>
                  </strong>
                  <p className="mb-0 mt-2 text-secondary">
                    {order.employee.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
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
                  Choose an employee
                </label>
                <input
                  className="mt-2"
                  list="employees"
                  id="employee-choice"
                  name="employee-choice"
                  onChange={getEmployee}
                />
                <datalist id="employees" className="text-center">
                  {employees
                    .filter((e) => e.isAvailable)
                    .map((e) => (
                      <option
                        key={e.id}
                        value={`${e.firstName} ${e.lastName}`}
                      />
                    ))}
                </datalist>

                <WarningModal
                  onClick={() => {}}
                  body="Are you sure you want to assign this employee? Once you do this you wont be able to leave order without assigned worker!"
                  buttonBody="Assign new employee"
                  style="mt-4 py-2 bg-secondary bg-gradient text-white text-weight-bold"
                  formId="newEmployee"
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
                  {order.done ? "Mark order as not done" : "Mark order as done"}
                </h3>
              </button>
            </div>
          </div>
          {formError && <p>{formError}</p>}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </AuthenticatedView>
  );
};
