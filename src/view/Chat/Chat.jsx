import { OpenConversation } from "../../components/Chat/OpenConversation";
import { Sidebar } from "../../components/Chat/Sidebar";
import { useConversations } from "../../core/contexts/ConversationsProviders";
import { useSelectUser } from "../../core/hooks/SelectUser/useSelectUser";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { isBoolean } from "../../utils/isCheckers/isBooleans";

import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useChat } from "../../core/hooks/Chat/useChat";
import { addMessageToConversation } from "../../store/Chat/slice";

let stompClient = null;

export const Chat = () => {
  const { user } = useSelectUser();
  const { selectedConversation, onMessageReceived: onMessageReceivedClient } =
    useConversations();
  const { convs, onConvGet, contactsLoading } = useChat({ fetchOnMount: true });

  const onMessageReceived = (payload) => {
    const body = JSON.parse(payload.body);

    addMessageToConversation({
      conversationId: body.conversationId,
      text: body.text,
      senderId: body.senderId,
      createdAt: body.createdAt,
    });

    onMessageReceivedClient(payload);
  };

  function connect() {
    const Sock = new SockJS("http://localhost:5000/chat");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, (err) => console.log(err));
  }

  const onConnected = () => {
    convs.forEach((c) => {
      stompClient.subscribe(
        `/conversation/${c.conversationId}/private`,
        onMessageReceived
      );
    });
    stompClient.subscribe(`/conversation/${user.id}/new`, onNewConvGet);
  };

  const onNewConvGet = async (payload) => {
    onConvGet(payload);
    const data = JSON.parse(payload.body);
    stompClient.subscribe(
      `/conversation/${data.conversationId}/private`,
      onMessageReceived
    );
  };

  if (stompClient === null && !contactsLoading) {
    console.log("cze");
    connect();
  }

  function sendMessage(conversationId, text) {
    const message = {
      convID: conversationId,
      senderID: user.id,
      content: text,
    };

    stompClient.send(`/app/conversationMessage/`, {}, JSON.stringify(message));
  }

  return !isBoolean(user) ? (
    <AuthenticatedView>
      <div className="d-flex" style={{ height: "100vh" }}>
        <Sidebar name={`${user.firstName} ${user.lastName}`} id={user.id} />
        {selectedConversation && <OpenConversation sendMessage={sendMessage} />}
      </div>
    </AuthenticatedView>
  ) : (
    <p>Something gone wrong!</p>
  );
};
