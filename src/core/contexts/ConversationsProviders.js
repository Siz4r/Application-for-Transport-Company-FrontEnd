import React, { useContext, useState, useEffect, useCallback } from "react";
import { useChat } from "../hooks/Chat/useChat";

import SockJS from "sockjs-client";
import { over } from "stompjs";
import { apiFetch, AuthorizationLevel } from "../apiFetch";
import dayjs from "dayjs";

var stompClient = null;

const ConversationsContext = React.createContext();

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export function ConversationsProvider({ id, children }) {
  const { onConvGet, convs } = useChat();

  const [conversations, setConversations] = useState(convs);
  const onMessageReceived = (payload) => {
    const body = JSON.parse(payload.body);

    addMessageToConversation({
      conversationId: body.conversationId,
      text: body.text,
      senderId: body.senderId,
      createdAt: body.createdAt,
    });
  };

  if (conversations.length < convs.length) {
    setConversations(convs);
  }

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useChat();

  const addMessageToConversation = useCallback(
    ({ conversationId, text, senderId, createdAt }) => {
      setConversations((prevConversations) => {
        const newMessage = {
          senderId,
          text,
          createdAt: dayjs(createdAt).toDate(),
        };
        const newConversations = prevConversations.map((conversation) => {
          if (conversation.conversationId === conversationId) {
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

  // useEffect(async () => {
  //   // if (convs.length === conversations.length) {
  //   // connect();
  //   // if (stompClient == null) return;
  //   // }
  //   // setConversations(convs);
  // }, [stompClient, addMessageToConversation, setConversations]);

  // function connect() {
  //   const Sock = new SockJS("http://localhost:5000/chat");
  //   stompClient = over(Sock);
  //   stompClient.connect({}, onConnected, (err) => console.log(err));
  // }

  // const onConnected = () => {
  //   conversations.forEach((c) => {
  //     stompClient.subscribe(
  //       `/conversation/${c.conversationId}/private`,
  //       onMessageReceived
  //     );
  //   });
  //   stompClient.subscribe(`/conversation/${id}/new`, onNewConvGet);
  // };

  // const onNewConvGet = async (payload) => {
  //   onConvGet(payload);
  //   const data = JSON.parse(payload.body);
  //   stompClient.subscribe(
  //     `/conversation/${data.conversationId}/private`,
  //     onMessageReceived
  //   );
  // };

  // function sendMessage(conversationId, text) {
  //   const message = {
  //     convID: conversationId,
  //     senderID: id,
  //     content: text,
  //   };

  //   stompClient.send(`/app/conversationMessage/`, {}, JSON.stringify(message));
  // }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.users.map((user) => {
      const contact = contacts.find((contact) => {
        return contact.id === user.id;
      });
      const name = contact.firstName + " " + contact.lastName;
      return { id: user.id, name };
    });

    // console.log(dayjs(conversation.messages[0].createdAt).toDate().getTime());
    const messages = conversation.messages
      .map((message) => {
        const contact = contacts.find((contact) => {
          return contact.id === message.senderId;
        });
        const name =
          (contact && contact.firstName + " " + contact.lastName) ||
          message.sender;
        const fromMe = id === message.senderId;
        return {
          ...message,
          senderName: name,
          fromMe,
          createdAt: dayjs(message.createdAt).toDate(),
        };
      })
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    // sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    onMessageReceived,
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
