import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../core/contexts/ConversationsProviders";

import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useEffect, useState } from "react";
import { useChat } from "../../core/hooks/Chat/useChat";

var stompClient = undefined;

export const Conversations = (props) => {
  const { selectConversationIndex, selectedConversation, conversations } =
    useConversations();
  const { contactsLoading } = useChat();

  // const [conversations, setConversations] = useState(convs);

  return (
    <ListGroup variant="flush">
      {!contactsLoading &&
        conversations &&
        conversations.map((conversation, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => selectConversationIndex(index)}
            active={
              conversation.conversationId ===
              selectedConversation.conversationId
            }
          >
            {conversation.conversationName}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};
