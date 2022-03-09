import { Link } from "react-router-dom";
import { RouterPathsKeys } from "../../types";
import classes from "./OrderComponent.module.css";

type Props = {
  clientFirstName: string | boolean;
  clientLastName: string | boolean;
  employeeFirstName: string | boolean;
  employeeLastName: string | boolean;
  companyFrom: string;
  stuffName: string;
  realized: boolean;
  id: string;
};

export const OrderComponent = (props: Props) => {
  return (
    <div className={props.realized ? classes.realized : classes.inRealization}>
      <div className={classes.order}>
        {props.clientFirstName && props.clientLastName ? (
          <div className={classes.client}>
            Client: <br></br> {props.clientFirstName} {props.clientLastName}
          </div>
        ) : (
          ""
        )}
        <div className={classes.dest}>
          <div className={classes.from}>
            From: <br></br>
            {props.companyFrom}
          </div>
          <div className={classes.truck} />
        </div>
        <div className={classes.stuff}>
          <div className={classes.stuffImage} />
          <p>{props.stuffName}</p>
        </div>
        {props.employeeFirstName && props.employeeLastName ? (
          <div className={classes.assignedEmployee}>
            Assigned Employee: <br /> {props.employeeFirstName + " "}
            {props.employeeLastName}
          </div>
        ) : (
          ""
        )}
        <Link className={classes.details} to={RouterPathsKeys.ORDER + props.id}>
          Details
        </Link>
      </div>
    </div>
  );
};
