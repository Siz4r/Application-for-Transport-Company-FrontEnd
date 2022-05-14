import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getContacts, getConv } from "../../../store/Chat/api";
import { Contact, Conversation } from "../../../store/Chat/type";
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
  };
};
