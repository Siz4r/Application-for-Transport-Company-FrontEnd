import { Link } from "react-router-dom";
import { useClients } from "../../core/hooks/Clients/useClients";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { RouterPathsKeys } from "../../types";
import classes from "./Clients.module.css";

export const Clients = () => {
  const { clientsLoading, clients } = useClients({
    fetchOnMount: true,
  });

  return (
    <AuthenticatedView>
      <div className={classes.container}>
        {!clientsLoading && clients.length < 1 ? (
          <p style={{ fontSize: "5vh" }}>You don't have any clients!</p>
        ) : (
          <ul>
            {clients.map((e) => (
              <li key={e.id}>
                <div className={classes.pic} />
                <div className={classes.clientData}>
                  {e.firstName} {e.lastName}
                </div>
                <Link
                  to={RouterPathsKeys.CLIENT + e.id}
                  className={classes.link}
                >
                  Client Details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AuthenticatedView>
  );
};
