import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { File } from "../../store/Files/types";

const FILES: File[] = [
  {
    id: "1",
    senderFirstName: "Marek",
    senderLastName: "Marecki",
    sendDate: new Date(),
    url: "https://res.cloudinary.com/siz4rimag/image/upload/v1636561201/bfndu4hvh6wku0krmoj8.pdf",
  },
  {
    id: "2",
    senderFirstName: "Kacper",
    senderLastName: "Tarasiuk",
    sendDate: new Date(),
    url: "https://res.cloudinary.com/siz4rimag/image/upload/v1643390736/443-4432362_fabric-fabric-icon-png-transparent-png_1_euwyic.png",
  },
];

export const Files = () => {
  const openWindowWithFile = () => {
    window.open(
      "https://res.cloudinary.com/siz4rimag/image/upload/v1645195731/toppng.com-left-arrow-comments-transparent-background-arrow-png-white-980x472_j1f61q.png"
    );
  };

  return (
    <AuthenticatedView>
      <div className="container">
        {FILES.map((f) => (
          <div className="row shadowBox m-2 mt-3 align-items-center">
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
              <h1>{f.sendDate.toDateString()}</h1>
            </div>
            <div className="col-4 text-center">
              <button
                className="border-none p-3 px-5 bg-secondary rounded"
                onClick={openWindowWithFile}
              >
                <h1 className="link-light">Download</h1>
              </button>
            </div>
          </div>
        ))}
      </div>
    </AuthenticatedView>
  );
};
