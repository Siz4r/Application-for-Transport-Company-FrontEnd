import React from "react";
import { Link } from "react-router-dom";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { RouterPathsKeys } from "../../types";
import classes from "./Employees.module.css";

type Props = {};

const EMPLOYEES = [
  {
    id: 1,
    firstName: "Jarek",
    lastName: "Kowalski",
    isAvailable: true,
  },
  {
    id: 2,
    firstName: "Sasza",
    lastName: "Nowacki",
    isAvailable: false,
  },
];

export const Employees = (props: Props) => {
  return (
    <AuthenticatedView>
      <div className={classes.container}>
        <ul>
          {EMPLOYEES.map((e) => (
            <li key={e.id}>
              <div className={classes.pic} />
              <div className={classes.employeeData}>
                {e.firstName} {e.lastName}
              </div>
              <Link
                to={RouterPathsKeys.EMPLOYEE + e.id}
                className={classes.link}
              >
                Employee Details
              </Link>
              <div
                className={classes.isAvailable}
                style={{ background: e.isAvailable ? "#20E81C" : "red" }}
              >
                {e.isAvailable
                  ? "Employee is available"
                  : "Employee isn't available"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AuthenticatedView>
  );
};
