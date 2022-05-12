import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
  body: string;
  buttonBody: string;
  onClick: () => void;
  style: string;
  formId: string;
  disableButton: boolean;
};

export const WarningModal = (props: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOk = () => {
    props.onClick();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <div className="row m-0">
      <button
        className={props.style}
        type="button"
        disabled={props.disableButton}
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
          <Button
            variant="primary"
            onClick={handleOk}
            form={props.formId}
            type="submit"
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
