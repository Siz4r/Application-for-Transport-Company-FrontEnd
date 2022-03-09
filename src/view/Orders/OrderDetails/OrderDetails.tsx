import { AuthenticatedView } from "../../../core/wrappers/AuthenticatedView";
import "./OrderDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOrders } from "../../../core/hooks/Orders/useOrders";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RouterPathsKeys } from "../../../types";
import { isBoolean } from "../../../utils/isCheckers/isBooleans";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

export const OrderDetails = () => {
  const { fetchOrderById } = useOrders({
    fetchOnMount: false,
  });
  const [isOrderLoading, setIsOrderLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<
    boolean | Awaited<ReturnType<typeof fetchOrderById>>
  >(false);

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
          } else {
            navigate(RouterPathsKeys.ORDER);
          }
        })
        .finally(() => setIsOrderLoading(false));
    }
  }, []);

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
                  {order.company.address.buildingNumber != 0 ? (
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
                  <h2>
                    order On: <br />
                    {order.stuffName}
                  </h2>
                </div>
                <div className="col">
                  <h2>
                    Quantity: <br /> {order.quantity}
                  </h2>
                </div>
              </div>
            </div>
            <div className="col align-self-center text-center">
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
                  {order.client.address.buildingNumber != 0 ? (
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
            <form className="col align-items-start">
              <div className="row mt-4">
                <label htmlFor="employee-choice" className="bg-white border-0">
                  Choose a employee
                </label>
                <input
                  className="mt-2"
                  list="employees"
                  id="employee-choice"
                  name="employee-choice"
                />
                <datalist id="employees">
                  <option value="Sasza Rusalksi" />
                </datalist>

                <button className="mt-4 py-2 bg-secondary bg-gradient text-white text-weight-bold">
                  Assign new employee
                </button>
              </div>
            </form>
            <div className="col align-self-center text-center">
              <button className="mt-3 p-4 bg-success bg-gradient text-white">
                <h3 className="p-0">Mark order as done</h3>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </AuthenticatedView>
  );
};
