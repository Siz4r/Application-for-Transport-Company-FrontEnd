import React from "react";
import { ListGroup } from "react-bootstrap";
import { useChat } from "../../core/hooks/Chat/useChat";

export const Contacts = () => {
  const { contacts } = useChat();

  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.id}>
          {contact.firstName} {contact.lastName} ({contact.email})
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
