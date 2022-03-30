import { useState } from "react";
import { useCompanies } from "../../core/hooks/Company/useCompanies";
import { parseErrorToString } from "../../core/parseErrorToString";
import { Stuff } from "../../store/Companies/types";
import { WarningModal } from "../Modals/warningModal";

type Props = {
  stuff: Stuff;
  setFormError: (text: string) => void;
  onStuffDelete: (id: string) => void;
  isAdmin: boolean;
};

export const StuffItem = (props: Props) => {
  const { removeStuff, editStuffData } = useCompanies({ fetchOnMount: false });

  const { stuff } = props;

  const [quantity, setQuantity] = useState(stuff.quantity);
  const [edited, setEdited] = useState(false);
  const [prize, setPrize] = useState(stuff.prize);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const editStuffHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity >= 0 && prize > 0) {
      try {
        await editStuffData({
          quantity: quantity,
          prize: prize,
          id: stuff.id,
        });
        setEdited(true);
      } catch (error) {
        parseErrorToString(error, setFormError);
      }
    }
  };

  return (
    <li className="row shadowBox p-3 align-items-center m-0">
      {formError && <p className="text-danger my-0">{formError}</p>}
      {edited && <p className="text-success my-0">Stuff succesfully edited!</p>}
      <div className="col-2">
        <img
          src="https://res.cloudinary.com/siz4rimag/image/upload/v1645197029/commodity-icon-12_1_q8memw.png"
          alt=""
          className="img-fluid"
          style={{ maxWidth: 150 }}
        />
      </div>
      <div className="col-2 text-center">
        <h2 className="m-0">{stuff.name}</h2>
        <h4>Quantity:</h4>
        <form id={`${stuff.id}`} onSubmit={editStuffHandler}>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(event) => {
              setQuantity(parseInt(event.currentTarget.value));
            }}
            className="mb-2 w-100 px-3 border border-2 border-dark"
            disabled={!props.isAdmin}
          />
          <h5>Prize for ton:</h5>
          <input
            type="number"
            placeholder="Prize"
            value={prize}
            onChange={(event) => {
              setPrize(parseInt(event.currentTarget.value));
            }}
            className="mb-2 w-100 px-3 border border-2 border-dark"
            disabled={!props.isAdmin}
          />
        </form>
      </div>
      <div className="col-5 text-center">
        <p>{stuff.description}</p>
      </div>
      {props.isAdmin && (
        <div className="col-3">
          <WarningModal
            body="Do you really want to delete this stuff?"
            buttonBody="Delete stuff"
            formId={`editForm${stuff.id}`}
            onClick={async () => {
              await removeStuff(stuff.id);
              props.onStuffDelete(stuff.id);
            }}
            style="w-100 bg-danger my-3"
          />

          <button className="bg-warning w-100 my-3" form={`${stuff.id}`}>
            Edit stuff
          </button>
        </div>
      )}
    </li>
  );
};
