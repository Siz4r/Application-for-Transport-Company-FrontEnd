import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useConversations } from "../../core/contexts/ConversationsProviders";
import { useChat } from "../../core/hooks/Chat/useChat";
import useInput from "../../core/hooks/Inputs/useInputs";
import { parseErrorToString } from "../../core/parseErrorToString";
import { Input } from "../UI/Input";

type Props = {
  closeModal: () => void;
  userId: string;
};

export const isNotEmpty = (value: string) => value.trim().length > 2;
export const hasOnlyLetters = (value: string) =>
  !/[^a-zżźółćśęąń ]/i.test(value);
export const correctTextInput = (value: string) =>
  isNotEmpty(value) && hasOnlyLetters(value);

export const NewConversationModal = (props: Props) => {
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const { contacts, addConv } = useChat({ fetchOnMount: true });
  const [formError, setFormError] = useState<undefined | string>(undefined);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameIsHasError,
    valueChangeHandler: nameIsChangeHandler,
    inputBlurHandler: nameIsBlurHandler,
  } = useInput(correctTextInput, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(undefined);
    if (selectedContactIds.length > 0 && nameIsValid) {
      try {
        await addConv(nameValue, [...selectedContactIds, props.userId]);
      } catch (error: any) {
        parseErrorToString(error, setFormError);
      }
    }
    props.closeModal();
  };

  const handleCheckboxChange = (contactId: string) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton>Stwórz konwersacje</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(
            (contact) =>
              contact.id !== props.userId && (
                <Form.Group controlId={contact.id} key={contact.id}>
                  <Form.Check
                    type="checkbox"
                    value={contact.id}
                    label={`${contact.firstName} ${contact.lastName}`}
                    onChange={() => handleCheckboxChange(contact.id)}
                  />
                </Form.Group>
              )
          )}
          <div className="col w-50 h5">
            <Input
              id="name"
              placeholder="Nazwa konwersacji"
              type="text"
              labelText="Nazwa konwersacji:"
              value={nameValue}
              onBlur={nameIsBlurHandler}
              onChange={nameIsChangeHandler}
              hasError={nameIsHasError}
              disabled={false}
            />
          </div>
          <Button type="submit" disabled={selectedContactIds.length < 1}>
            Stwórz
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};
