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
          <div className="m-3 h5">
            Klient: <br /> {props.clientFirstName} {props.clientLastName}
          </div>
        ) : (
          ""
        )}
        <div className={classes.dest}>
          <div className="h5 mx-5">
            Od: <br></br>
            {props.companyFrom}
          </div>
          <div className={classes.truck} />
        </div>
        <div className={classes.stuff}>
          <div className={classes.stuffImage} />
          <h5>{props.stuffName}</h5>
        </div>
        {props.employeeFirstName && props.employeeLastName ? (
          <div className={classes.assignedEmployee}>
            Przypisany pracownik: <br /> {props.employeeFirstName + " "}
            {props.employeeLastName}
          </div>
        ) : (
          ""
        )}
        <Link className="h5 px-5 mx-5" to={RouterPathsKeys.ORDER + props.id}>
          Szczegóły
        </Link>
      </div>
    </div>
  );
};
