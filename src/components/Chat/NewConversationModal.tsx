import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useConversations } from "../../core/contexts/ConversationsProviders";
import { useChat } from "../../core/hooks/Chat/useChat";

type Props = {
  closeModal: () => void;
};

export const NewConversationModal = (props: Props) => {
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const { contacts } = useChat({ fetchOnMount: true });
  const { createConversation } = useConversations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createConversation(selectedContactIds);
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
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={contact.id}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};
