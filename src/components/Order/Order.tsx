import classes from "./Order.module.css";

type Props = {
  clientFirstName: string;
  clientLastName: string;
  companyFrom: string;
  companyTo: string;
  stuffName: string;
  realized: boolean;
};

export const Order = (props: Props) => {
  return (
    <div className={props.realized ? classes.realized : classes.inRealization}>
      <div className={classes.order}>
        <div className={classes.client}>
          Client: <br></br> {props.clientFirstName} {props.clientLastName}
        </div>
        <div className={classes.dest}>
          <div className={classes.from}>
            From: <br></br>
            {props.companyFrom}
          </div>
          <div className={classes.truckAndArrow}>
            <div className={classes.truck} />
            <div className={classes.arrow} />
          </div>
          <div className={classes.to}>
            To: <br></br>
            {props.companyTo}
          </div>
        </div>
        <div className={classes.stuff}>
          <div className={classes.stuffImage} />
          <p>{props.stuffName}</p>
        </div>
        <div className={classes.details}>Details</div>
      </div>
    </div>
  );
};
