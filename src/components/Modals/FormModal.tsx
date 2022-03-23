import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type Props = {
  formId: string;
  children: React.ReactNode;
  buttonBody: string;
};

export const FormModal = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setIsOpenModal(true)} className="py-3 w-50 mb-5">
        {props.buttonBody}
      </Button>

      <Modal show={isOpenModal} onHide={() => setIsOpenModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Choose the stuff</Modal.Title>
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
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
