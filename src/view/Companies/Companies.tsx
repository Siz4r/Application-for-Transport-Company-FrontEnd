import "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useCompanies } from "../../core/hooks/Company/useCompanies";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { RouterPathsKeys } from "../../types";

export const Companies = () => {
  const { companies, companiesLoading } = useCompanies({ fetchOnMount: true });

  return (
    <AuthenticatedView>
      <div className="container text-center">
        {!companiesLoading ? (
          companies.length !== 0 ? (
            <div className="row m-2">
              <ul className="list-group">
                {companies.map((c) => (
                  <li className="list-group-item" key={c.id}>
                    <div className="row my-2 align-items-center">
                      <div className="col-2">
                        <img
                          src="https://res.cloudinary.com/siz4rimag/image/upload/v1646418562/443-4432362_fabric-fabric-icon-png-transparent-png_1_xkyvh4.png"
                          alt=""
                          className="img-fluid"
                          style={{ maxHeight: 183 }}
                        />
                      </div>
                      <div className="col-2 text-center">
                        <h2 className="my-3">{c.name}</h2>
                        <h5 className="text-secondary m-0 p-0">
                          {c.address.street} {c.address.buildingNumber}
                        </h5>
                        <h5 className="text-secondary m-0 p-0">
                          {c.address.postalCode} {c.address.city}
                        </h5>
                      </div>
                      <div className="col-4 text-center">
                        <Link
                          to={RouterPathsKeys.COMPANY + c.id}
                          className="text-primary"
                        >
                          <h1>Company Details</h1>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h2>You have no registered companys!</h2>
          )
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </AuthenticatedView>
  );
};
