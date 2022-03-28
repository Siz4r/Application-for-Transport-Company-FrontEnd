import { Link, useNavigate } from "react-router-dom";
import { RegisterModal } from "../../components/Modals/RegisterModal";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useClients } from "../../core/hooks/Clients/useClients";
import { useSelectUser } from "../../core/hooks/SelectUser/useSelectUser";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { RouterPathsKeys } from "../../types";
import classes from "./Clients.module.css";

export const Clients = () => {
  const { clientsLoading, clients, registerClient } = useClients({
    fetchOnMount: true,
  });
  const { role } = useSelectUser();
  const navigate = useNavigate();

  if (role === "Employees") {
    navigate(RouterPathsKeys.MY_PROFILE);
  }

  return (
    <AuthenticatedView>
      <div className="container text-center">
        {!clientsLoading ? (
          <div className="row m-2 d.flex flex-row-center mb-0">
            {clients.length < 1 ? (
              <p style={{ fontSize: "5vh" }} className="text-center">
                You don't have any clients!
              </p>
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
        ) : (
          <LoadingSpinner />
        )}
        <RegisterModal submit={registerClient} buttonBody="Register a client" />
      </div>
    </AuthenticatedView>
  );
};
