import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getContacts } from "../../../store/Chat/api";
import { Contact } from "../../../store/Chat/type";
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

  const contacts = useSelector<RootState>(({ chat }) => {
    return chat.contacts;
  }) as Contact[];

  const fetchContacts = async (): Promise<Contact[]> => {
    setContactsLoading(true);
    const { payload } = await typedDispatchGetAllContacts(getContacts());
    console.log(payload);
    setContactsLoading(false);
    return payload;
  };

  useEffect(() => {
    if (fetchOnMount) {
      try {
        fetchContacts();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  console.log(contacts);

  return {
    contactsLoading,
    contacts,
    fetchContacts,
  };
};
