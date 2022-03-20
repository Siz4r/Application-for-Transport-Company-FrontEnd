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
      <div className="container">
        <div className="row m-2">
          {!clientsLoading && clients.length < 1 ? (
            <p style={{ fontSize: "5vh" }}>You don't have any clients!</p>
          ) : (
            <ul className="list-group">
              {clients.map((e) => (
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
                        to={RouterPathsKeys.CLIENT + e.id}
                        className={classes.link}
                      >
                        Client Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AuthenticatedView>
  );
};