import React, { useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient = null;
const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  // useEffect(async () => {
  //   let Sock = new SockJS("http://localhost:5000/chat");
  //   stompClient = over(Sock);
  //   await stompClient.connect({}, onConnected, (err) => console.log(err));

  //   setSocket(stompClient);
  // }, [id]);

  // const onConnected = () => {
  //   // stompClient.subscribe("/chatroom/public", onMessageReceived);
  // };

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
