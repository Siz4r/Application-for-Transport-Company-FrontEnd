import React, { useContext, useState, useEffect, useCallback } from "react";
import { useChat } from "../hooks/Chat/useChat";
import { useSocket } from "./SockerProvider";

import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient = null;

const ConversationsContext = React.createContext();

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export function ConversationsProvider({ id, children }) {
  const { convs } = useChat({
    fetchOnMount: true,
  });

  const [conversations, setConversations] = useState(convs);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useChat();

  const addMessageToConversation = useCallback(
    ({ conversationId, text, senderId }) => {
      console.log(conversationId);
      console.log(text);
      console.log(senderId);
      setConversations((prevConversations) => {
        const newMessage = { senderId, text };
        const newConversations = prevConversations.map((conversation) => {
          if (conversation.conversationId === conversationId) {
            console.log(newMessage);
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        return newConversations;
      });
    },
    [setConversations]
  );

  useEffect(async () => {
    connect();
    if (stompClient == null) return;

    setConversations(convs);
  }, [stompClient, addMessageToConversation, setConversations]);

  function connect() {
    const Sock = new SockJS("http://localhost:5000/chat");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, (err) => console.log(err));
  }

  const onConnected = () => {
    conversations.forEach((c) =>
      stompClient.subscribe(
        `/conversation/${c.conversationId}/private`,
        onMessageReceived
      )
    );
  };

  const onMessageReceived = (payload) => {
    const body = JSON.parse(payload.body);

    console.log("BODY" + body.convId);

    addMessageToConversation({
      conversationId: body.convId,
      text: body.text,
      senderId: body.sender,
    });
  };

  function sendMessage(conversationId, text, senderId) {
    console.log(senderId);
    const message = {
      convID: conversationId,
      senderID: id,
      content: text,
    };

    stompClient.send(`/app/conversationMessage/`, {}, JSON.stringify(message));

    // addMessageToConversation({ conversationId, text, senderId: id });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.users.map((user) => {
      const contact = contacts.find((contact) => {
        return contact.id === user.id;
      });
      const name = contact.firstName + " " + contact.lastName;
      return { id: user.id, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.senderId;
      });
      const name =
        (contact && contact.firstName + " " + contact.lastName) ||
        message.sender;
      const fromMe = id === message.senderId;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;
  const arr1 = [...a];
  const arr2 = [...b];
  arr1.sort();
  arr2.sort();

  return arr1.every((element, index) => {
    return element === arr2[index];
  });
}
