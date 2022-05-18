import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  createConv,
  getContacts,
  getConv,
  onConvReceived,
} from "../../../store/Chat/api";
import {
  Contact,
  Conversation,
  ConversationDTO,
} from "../../../store/Chat/type";
import { useTypedDispatch } from "../TypedDispatch/useTypedDispatch";

type UseProjectsConfig = {
  fetchOnMount?: boolean;
};

export const useChat = (config: UseProjectsConfig | undefined = undefined) => {
  const fetchOnMount = config && config.fetchOnMount === false ? false : true;

  const [contactsLoading, setContactsLoading] = useState(
    fetchOnMount ? true : false
  );

  const typedDispatchGetAllContacts = useTypedDispatch<
    typeof getContacts,
    Contact[]
  >();

  const typedDispatchGetAllConvs = useTypedDispatch<
    typeof getConv,
    Conversation[]
  >();

  const typedDispatchCreateConv = useTypedDispatch<typeof createConv, string>();

  const typedDispatchOnReceivedConv = useTypedDispatch<
    typeof onConvReceived,
    void
  >();

  const contacts = useSelector<RootState>(({ chat }) => {
    return chat.contacts;
  }) as Contact[];

  const convs = useSelector<RootState>(({ chat }) => {
    return chat.conversations;
  }) as Conversation[];

  const fetchContacts = async (): Promise<Contact[]> => {
    setContactsLoading(true);
    const { payload } = await typedDispatchGetAllContacts(getContacts());
    setContactsLoading(false);
    return payload;
  };

  const fetchConvs = async (): Promise<Conversation[]> => {
    setContactsLoading(true);
    const { payload } = await typedDispatchGetAllConvs(getConv());
    setContactsLoading(false);
    return payload;
  };

  const addConv = async (name: string, users: string[]) => {
    setContactsLoading(true);
    const { payload } = await typedDispatchCreateConv(
      createConv({ name, users })
    );
    setContactsLoading(false);
    return payload;
  };

  const onConvGet = async (
    payload: any,
    stompClient: any,
    onMessageReceived: any
  ) => {
    typedDispatchOnReceivedConv(onConvReceived(payload.body));
  };

  useEffect(() => {
    if (fetchOnMount) {
      try {
        fetchContacts();
        fetchConvs();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return {
    contactsLoading,
    contacts,
    convs,
    fetchContacts,
    addConv,
    onConvGet,
  };
};
