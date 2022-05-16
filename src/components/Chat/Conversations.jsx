import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../core/contexts/ConversationsProviders";

export const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations();

  // console.log(conversations);

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.conversationName}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
