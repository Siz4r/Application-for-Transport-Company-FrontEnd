import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
  body: string;
  buttonBody: string;
  onClick: () => void;
  placeInRightBottomCorner: boolean;
  style: any;
};

export const DeleteModal = (props: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    props.onClick();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <div className="row justify-content-end w-100">
      <button
        className="m-4 px-5 bg-danger w-25"
        type="button"
        onClick={handleShow}
      >
        {props.buttonBody}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
