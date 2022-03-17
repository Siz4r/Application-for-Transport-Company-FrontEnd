import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteModal } from "../../../components/Modals/deleteModal";
import { OrderComponent } from "../../../components/Order/OrderComponent";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { useClients } from "../../../core/hooks/Clients/useClients";
import { parseErrorToString } from "../../../core/parseErrorToString";
import { AuthenticatedView } from "../../../core/wrappers/AuthenticatedView";
import { EmployeeAndClientOrders } from "../../../store/Orders/types";
import { RouterPathsKeys } from "../../../types";
import { isBoolean } from "../../../utils/isCheckers/isBooleans";
import "./Client.css";

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

  const { fetchClientById, removeClient } = useClients({
    fetchOnMount: false,
  });
  const [isClientLoading, setIsClientLoading] = useState<boolean>(true);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const [client, setClient] = useState<
    boolean | Awaited<ReturnType<typeof fetchClientById>>
  >(false);

  useEffect(() => {
    if (id === undefined) {
      navigate(RouterPathsKeys.CLIENT);
    } else {
      try {
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
      } catch (error: any) {
        parseErrorToString(error, setFormError);
      }
    }
  }, []);

  const deleteClient = async () => {
    if (id !== undefined) {
      try {
        await removeClient(id);
        navigate(RouterPathsKeys.CLIENT);
      } catch (error: any) {
        parseErrorToString(error, setFormError);
      }
    }
  };

  return (
    <AuthenticatedView>
      {!isClientLoading && typeof client !== "boolean" ? (
        <div className="container">
          <div className="row mx-2 mt-2">
            <h2 className="col mr-3">Client</h2>
            {formError && <h3 className="col text-danger">{formError}</h3>}
          </div>
          <div className="row mx-2 shadowBox p-3">
            <div className="col-2 m-0 p-0">
              <img
                style={{ maxWidth: 190 }}
                src="https://res.cloudinary.com/siz4rimag/image/upload/v1644853870/443-4432362_fabric-fabric-icon-png-transparent-png_1_1_uv5fgp.png"
                alt=""
              />
            </div>
            <div className="col-3 mx-0 px-0 align-self-center text-center">
              <h3 className="mb-2">
                {client.firstName} {client.lastName}
              </h3>
              <h4 className="text-secondary m-0">{client.phoneNumber}</h4>
              <h4 className="text-secondary m-0">{client.email}</h4>
            </div>
            <div className="col-7 align-self-center">
              <div className="row justify-content-end">
                <div className="col-7 align-self-center">
                  <div className="row w-50 ms-auto m-4">
                    <label
                      htmlFor="file-upload"
                      className="text-center rounded bg-secondary"
                    >
                      Select file
                    </label>
                    <input type="file" id="file-upload" />
                  </div>
                </div>
                <div className="col-5 ml-2">
                  <div className="row">
                    <button className="p-3 py-4 text-center bg-secondary bg-gradient text-white text-weight-bold rounded">
                      Send file
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            {client.orders.length > 0 ? (
              <div className="m-2">
                <h3 className="row m-2">In Realization</h3>
                {mapOrders(false, client.orders)}

                <h3 className="row m-2">Done</h3>
                {mapOrders(true, client.orders)}
              </div>
            ) : (
              <h3 className="m-2">This client hasn't got any orders!</h3>
            )}
          </div>
          <DeleteModal
            buttonBody="Delete client"
            body="Do you really want to delete this client? All his data and related orders will be lost!"
            onClick={deleteClient}
            placeInRightBottomCorner={true}
            style="w-50"
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </AuthenticatedView>
  );
};
