import { useState } from "react";
import { Button, Modal, Nav, Tab } from "react-bootstrap";
import { Contacts } from "./Contacts";
import { Conversations } from "./Conversations";
import { NewConversationModal } from "./NewConversationModal";

type Props = {
  name: string;
  id: string;
};

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export const Sidebar = (props: Props) => {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Konwersacje</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Kontakty</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations userId={props.id} />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Hej, <span>{props.name}</span>
        </div>
        <Button onClick={() => setModalOpen(true)} className="rounded-0">
          Nowa {conversationsOpen ? "konwersacja" : "Contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        <NewConversationModal closeModal={closeModal} userId={props.id} /> :
      </Modal>
    </div>
  );
};
