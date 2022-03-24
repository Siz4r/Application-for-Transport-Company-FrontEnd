import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderComponent } from "../../../components/Order/OrderComponent";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { useEmployees } from "../../../core/hooks/Employees/useEmployees";
import { parseErrorToString } from "../../../core/parseErrorToString";
import { AuthenticatedView } from "../../../core/wrappers/AuthenticatedView";
import { EmployeeAndClientOrders } from "../../../store/Orders/types";
import { RouterPathsKeys } from "../../../types";
import { DeleteModal } from "../../../components/Modals/deleteModal";
import { isBoolean } from "../../../utils/isCheckers/isBooleans";
import { useSelectUser } from "../../../core/hooks/SelectUser/useSelectUser";

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
  const { role } = useSelectUser();

  if (role === "Clients") {
    navigate(RouterPathsKeys.MY_PROFILE);
  }

  const { fetchEmployeeById, removeEmployee } = useEmployees({
    fetchOnMount: false,
  });
  const [isEmployeeLoading, setIsEmployeeLoading] = useState<boolean>(true);
  const [formError, setFormError] = useState<string | undefined>(undefined);

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
  }, []);

  const deleteEmployee = async () => {
    if (id !== undefined) {
      try {
        await removeEmployee(id);
        navigate(RouterPathsKeys.EMPLOYEE);
      } catch (error: any) {
        parseErrorToString(error, setFormError);
      }
    }
  };

  return (
    <AuthenticatedView>
      {!isEmployeeLoading && typeof employee !== "boolean" ? (
        <div className="container">
          <div className="row mx-2 mt-2">
            <h2 className="col mr-3">Employee</h2>
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
                {employee.firstName} {employee.lastName}
              </h3>
              <h4 className="text-secondary m-0">{employee.phoneNumber}</h4>
              <h4 className="text-secondary m-0">{employee.email}</h4>
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
          <div>
            {employee.orders.length > 0 ? (
              <div>
                <h3>In Realization</h3>
                {mapOrders(false, employee.orders)}

                <h3>Done</h3>
                {mapOrders(true, employee.orders)}
              </div>
            ) : (
              <h3 className="row m-3">This employee hasn't done any orders!</h3>
            )}
          </div>
          <DeleteModal
            buttonBody="Delete employee"
            body="Do you really want to delete this employee? All his data and related orders will be lost!"
            onClick={deleteEmployee}
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
