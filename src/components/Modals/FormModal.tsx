import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type Props = {
  formId: string;
  children: React.ReactNode;
  buttonBody: string;
  topText: string;
};

export const FormModal = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setIsOpenModal(true)} className="py-3 w-50 mb-5">
        <p className="h4">{props.buttonBody}</p>
      </Button>

      <Modal show={isOpenModal} onHide={() => setIsOpenModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.topText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            form={props.formId}
            onClick={() => {
              setIsOpenModal(false);
            }}
          >
            Potwierdź
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
