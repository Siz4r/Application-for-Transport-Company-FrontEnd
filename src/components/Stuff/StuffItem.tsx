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
  editStuffHandler: (
    e: React.FormEvent,
    quantity: number,
    prize: number,
    stuff: Stuff,
    setEdited: (b: boolean) => void,
    parseErrorToString: any
  ) => void;
};

export const StuffItem = (props: Props) => {
  const { removeStuff, editStuffData } = useCompanies({ fetchOnMount: false });

  const { stuff } = props;

  const [quantity, setQuantity] = useState(stuff.quantity);
  const [edited, setEdited] = useState(false);
  const [prize, setPrize] = useState(stuff.prize);
  const [formError, setFormError] = useState<string | undefined>(undefined);

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
        <h4>Ilość w tonach:</h4>
        <form
          id={`${stuff.id}`}
          onSubmit={(e) =>
            props.editStuffHandler(
              e,
              quantity,
              prize,
              stuff,
              setEdited,
              parseErrorToString
            )
          }
        >
          <input
            type="number"
            placeholder="Ilość"
            value={quantity}
            onChange={(event) => {
              setQuantity(parseInt(event.currentTarget.value));
            }}
            className="mb-2 w-100 px-3 border border-2 border-dark"
            disabled={!props.isAdmin}
          />
          <h5>Cena za tone:</h5>
          <input
            type="number"
            placeholder="Cena za tone"
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
            body="Czy napewno chcesz usunąć ten towar?"
            buttonBody="Usuń towar"
            formId={`editForm${stuff.id}`}
            onClick={async () => {
              await removeStuff(stuff.id);
              props.onStuffDelete(stuff.id);
            }}
            style="w-100 bg-danger my-3"
            disableButton={false}
          />

          <button className="bg-warning w-100 my-3" form={`${stuff.id}`}>
            Edytuj towar
          </button>
        </div>
      )}
    </li>
  );
};
