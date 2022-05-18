import React, { useContext, useState, useEffect, useCallback } from "react";
import { useChat } from "../hooks/Chat/useChat";

import SockJS from "sockjs-client";
import { over } from "stompjs";
import { onConvReceived } from "../../store/Chat/api";

var stompClient = null;

const ConversationsContext = React.createContext();

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export function ConversationsProvider({ id, children }) {
  const { convs, onConvGet } = useChat({
    fetchOnMount: true,
  });

  const [conversations, setConversations] = useState(convs);

  // console.log("Zrealodowalo do tego: " + conversations);
  // console.log(conversations);
  // console.log(convs);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useChat();

  const addMessageToConversation = useCallback(
    ({ conversationId, text, senderId }) => {
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

  const onMessageReceived = (payload) => {
    const body = JSON.parse(payload.body);

    addMessageToConversation({
      conversationId: body.convId,
      text: body.text,
      senderId: body.sender,
    });
  };

  if (conversations.length != 0 && conversations.length < convs.length) {
    setConversations(convs);
  }

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
    conversations.forEach((c) => {
      stompClient.subscribe(
        `/conversation/${c.conversationId}/private`,
        onMessageReceived
      );
    });

    stompClient.subscribe(`/conversation/${id}/new`, onNewConvGet);
  };

  const onNewConvGet = async (payload) => {
    onConvGet(payload);
    const data = JSON.parse(payload.body);
    console.log(payload);
    stompClient.subscribe(
      `/conversation/${data.conversationId}/private`,
      onMessageReceived
    );
  };

  function sendMessage(conversationId, text, senderId) {
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

  console.log(convs);
  console.log(formattedConversations);

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
