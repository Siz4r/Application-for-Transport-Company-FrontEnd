import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useFiles } from "../../core/hooks/Files/useFiles";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";

export const Files = () => {
  const { files, fileLoading } = useFiles({
    fetchOnMount: true,
  });

  const openWindowWithFile = () => {
    window.open(
      "https://res.cloudinary.com/siz4rimag/image/upload/v1645195731/toppng.com-left-arrow-comments-transparent-background-arrow-png-white-980x472_j1f61q.png"
    );
  };

  return (
    <AuthenticatedView>
      <ul className="container">
        {!fileLoading ? (
          files.length != 0 ? (
            files.map((f) => (
              <li
                className="row shadowBox m-2 mt-3 align-items-center"
                key={f.id}
              >
                <div className="col-2">
                  <div className="m-3">
                    <img
                      src="https://res.cloudinary.com/siz4rimag/image/upload/v1648238061/443-4432362_fabric-fabric-icon-png-transparent-png_1_m63umd.png"
                      alt=""
                      style={{ width: 150 }}
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-3 text-center">
                  <h1>From:</h1>
                  <h1>
                    {f.senderFirstName} {f.senderLastName}
                  </h1>
                </div>
                <div className="col-3 text-center">
                  <h1>Send:</h1>
                  <h1>{f.createdAt}</h1>
                </div>
                <div className="col-4 text-center">
                  <button
                    className="border-none p-3 px-5 bg-secondary rounded"
                    onClick={openWindowWithFile}
                  >
                    <h1 className="link-light">Download</h1>
                  </button>
                </div>
              </li>
            ))
          ) : (
            <h2 className="text-center mt-3">
              You haven't received any files yet.
            </h2>
          )
        ) : (
          <LoadingSpinner />
        )}
      </ul>
    </AuthenticatedView>
  );
};
