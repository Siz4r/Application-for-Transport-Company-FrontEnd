import { Order } from "../../../components/Order/Order";
import { AuthenticatedView } from "../../../core/wrappers/AuthenticatedView";
import classes from "./Employee.module.css";

type Props = {};

const ORDERS = [
  {
    id: "0",
    clientFirstName: "Juliusz",
    clientLastName: "Slowacki",
    companyFrom: "Gazprom Białystok",
    companyTo: "Pelet Sokółka",
    stuffName: "Pelet",
    inRealization: true,
  },
  {
    id: "1",
    clientFirstName: "Juliusz",
    clientLastName: "Slowacki",
    companyFrom: "Gazprom Białystok",
    companyTo: "Pelet Sokółka",
    stuffName: "Drewno",
    inRealization: false,
  },
  {
    id: "2",
    clientFirstName: "Juliusz",
    clientLastName: "Slowacki",
    companyFrom: "Gazprom Białystok",
    companyTo: "Pelet Sokółka",
    stuffName: "Drewno",
    inRealization: true,
  },
  {
    id: "2",
    clientFirstName: "Juliusz",
    clientLastName: "Slowacki",
    companyFrom: "Gazprom Białystok",
    companyTo: "Pelet Sokółka",
    stuffName: "Drewno",
    inRealization: true,
  },
];

export const Employee = (props: Props) => {
  const inRealizationOrders = ORDERS.filter(
    (o) => o.inRealization === false
  ).map((o) => {
    return (
      <Order
        clientFirstName={o.clientFirstName}
        clientLastName={o.clientLastName}
        key={o.id}
        companyFrom={o.companyFrom}
        companyTo={o.companyTo}
        stuffName={o.stuffName}
        realized={o.inRealization}
      />
    );
  });

  const realizedOrders = ORDERS.filter((o) => o.inRealization === true).map(
    (o) => {
      return (
        <Order
          clientFirstName={o.clientFirstName}
          clientLastName={o.clientLastName}
          key={o.id}
          companyFrom={o.companyFrom}
          companyTo={o.companyTo}
          stuffName={o.stuffName}
          realized={o.inRealization}
        />
      );
    }
  );

  return (
    <AuthenticatedView>
      <div className={classes.wrapper}>
        <h2>Employee</h2>
        <div className={classes.container}>
          <div className={classes.person}>
            <div className={classes.pic} />
            <div className={classes.data}>
              <div className={classes.names}>Jarek Kowalski</div>
              <div className={classes.phoneNumber}>727 532 321</div>
            </div>
            <form>
              <label htmlFor="file-upload" className={classes.fileUpload}>
                Select file
              </label>
              <input type="file" id="file-upload" />
              <button className={classes.send}>Send file</button>
            </form>
          </div>

          <div className={classes.orders}>
            <h3>In Realization</h3>
            {inRealizationOrders}
            <h3>Done</h3>
            {realizedOrders}
          </div>
        </div>
      </div>
    </AuthenticatedView>
  );
};
