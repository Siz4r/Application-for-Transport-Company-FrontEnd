import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterModal } from "../../components/Modals/RegisterModal";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useEmployees } from "../../core/hooks/Employees/useEmployees";
import { useSelectUser } from "../../core/hooks/SelectUser/useSelectUser";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { RouterPathsKeys } from "../../types";
import classes from "./Employees.module.css";

export const Employees = () => {
  const { employeesLoading, employees, registerEmployee } = useEmployees({
    fetchOnMount: true,
  });

  const navigate = useNavigate();
  const { role } = useSelectUser();

  if (role === "Clients") {
    navigate(RouterPathsKeys.MY_PROFILE);
  }

  return (
    <AuthenticatedView>
      <div className="container text-center">
        {!employeesLoading ? (
          <div className="row m-2 d.flex flex-row-center mb-0">
            {employees.length < 1 ? (
              <p style={{ fontSize: "5vh" }}>You don't have any employees!</p>
            ) : (
              <ul className="list-group">
                {employees.map((e) => (
                  <li key={e.id} className="list-group-item">
                    <div className="row my-2">
                      <div className="col-4">
                        <div className="row">
                          <img
                            src="https://res.cloudinary.com/siz4rimag/image/upload/v1644853870/443-4432362_fabric-fabric-icon-png-transparent-png_1_1_uv5fgp.png"
                            style={{ maxWidth: 200 }}
                            alt=""
                          />
                          <div className="col-4 align-self-center text-center m-4">
                            <h4>
                              {e.firstName} {e.lastName}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 align-self-center">
                        <Link
                          to={RouterPathsKeys.EMPLOYEE + e.id}
                          className={classes.link}
                        >
                          Employee Details
                        </Link>
                      </div>
                      <div className="col align-self-center text-center">
                        <div
                          className="w-75 ms-auto"
                          style={{
                            background: e.isAvailable ? "#20E81C" : "red",
                          }}
                        >
                          {e.isAvailable
                            ? "Employee is available"
                            : "Employee isn't available"}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <LoadingSpinner />
        )}
        {role === "Admins" && (
          <RegisterModal
            submit={registerEmployee}
            buttonBody={"Register an employee"}
          />
        )}
      </div>
    </AuthenticatedView>
  );
};
