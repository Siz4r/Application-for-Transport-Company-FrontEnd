import { useState } from "react";
import { addUserToChat } from "../../../store/Chat/api";
import { NewChatUserRequestData } from "../../../store/Chat/type";
import { UserChatDto } from "../../../store/SignIn/types";
import { apiFetch } from "../../apiFetch";
import { useTypedDispatch } from "../TypedDispatch/useTypedDispatch";

export const useChat = () => {
  const typedDispatchAddUserToChar = useTypedDispatch<
    typeof addUserToChat,
    void
  >();

  const [chatLoading, setChatLoading] = useState(false);

  const addNewUserToChat = async (data: NewChatUserRequestData) => {
    setChatLoading(true);
    const response = await typedDispatchAddUserToChar(addUserToChat(data));
    setChatLoading(false);

    if (addUserToChat.rejected.match(response)) {
      throw new Error(response.error.message);
    }
  };

  const addAllUsersToChat = async () => {
    try {
      const response = await apiFetch<UserChatDto[]>("/api/user/", {
        requestConfig: {
          method: "GET",
          withCredentials: true,
        },
      });

      response.forEach((u) => {
        typedDispatchAddUserToChar(
          addUserToChat({
            ...u,
            username: `${u.firstName}_${u.lastName}`,
            secret: u.id,
          })
        );
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    addNewUserToChat,
    addAllUsersToChat,
    chatLoading,
  };
};
