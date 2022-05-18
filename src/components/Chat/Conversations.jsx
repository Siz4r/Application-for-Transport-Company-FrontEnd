import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../core/contexts/ConversationsProviders";

import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useEffect, useState } from "react";
import { useChat } from "../../core/hooks/Chat/useChat";

var stompClient = undefined;

export const Conversations = (props) => {
  const { selectConversationIndex, selectedConversation } = useConversations();
  const { convs, contactsLoading } = useChat({ fetchOnMount: true });

  console.log(selectedConversation);

  const [conversations, setConversations] = useState(convs);

  return (
    <ListGroup variant="flush">
      {!contactsLoading &&
        convs.map((conversation, index) => (
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
