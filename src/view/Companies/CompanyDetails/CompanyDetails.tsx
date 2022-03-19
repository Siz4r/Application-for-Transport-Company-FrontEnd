import { WarningModal } from "../../../components/Modals/warningModal";
import { AuthenticatedView } from "../../../core/wrappers/AuthenticatedView";

export const CompanyDetails = () => {
  return (
    <AuthenticatedView>
      <div className="container">
        <h1 className="mx-3 my-2">Company</h1>
        <div className="col shadowBox m-2 px-3">
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
              <h2 className="my-3">Trans-Mat</h2>
              <h5 className="text-secondary m-0 p-0">Sokolska 3</h5>
              <h5 className="text-secondary m-0 p-0">16-130 Janow</h5>
            </div>
          </div>
          <h1 className="py-4">Stuffs</h1>
          <div className="row shadowBox p-3 align-items-center">
            <div className="col-2">
              <img
                src="https://res.cloudinary.com/siz4rimag/image/upload/v1645197029/commodity-icon-12_1_q8memw.png"
                alt=""
                className="img-fluid"
                style={{ maxWidth: 150 }}
              />
            </div>
            <div className="col-2 text-center">
              <h2>Pelet</h2>
              <h2>Quantity: 200</h2>
            </div>
            <div className="col-5 text-center">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                natus consequatur aliquam cumque necessitatibus fugit? Velit
                facilis magnam architecto earum quae? Impedit omnis libero
                tempora incidunt quasi numquam molestiae autem!
              </p>
            </div>
            <div className="col-3">
              <WarningModal
                body="Do you really want to delete this stuff?"
                buttonBody="Delete stuff"
                formId="elo"
                onClick={() => {}}
                style="w-100 bg-danger my-3"
              />

              <button className="bg-warning w-100 my-3">Edit stuff</button>
            </div>
          </div>
          <div className="row align-items-end">
            <form className="shadowBox my-4 col-9 p-3">
              <div className="row">
                <div className="col-4">
                  <input
                    type="text"
                    className="mb-2 w-100 py-3 px-3 border border-2 border-dark"
                    placeholder="Name"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  />
                  <input
                    type="text"
                    className="w-75 my-2 mb-5 py-3 px-3 w-100 border border-2 border-dark"
                    placeholder="Quantity"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  />
                  <button
                    className="bg-success w-100 mt-5 border border-2 border-dark"
                    style={{ fontSize: 20 }}
                  >
                    Add stuff
                  </button>
                </div>
                <div className="col-8">
                  <textarea
                    placeholder="Description"
                    className="h-100 w-100 p-2 px-3 border border-2 border-dark"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  />
                </div>
              </div>
            </form>
            <div className="col-3">
              <WarningModal
                body="Do you really want to delete this company?"
                buttonBody="Delete stuff"
                formId="elo"
                onClick={() => {}}
                style="w-100 bg-danger my-4 h5"
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedView>
  );
};
