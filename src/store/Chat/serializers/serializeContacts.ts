import { Contact, ContactDto } from "../type";

export const serializeContacts = (apiEmployees: ContactDto[]): Contact[] => {
  const contacts: Contact[] = apiEmployees.map(
    (c) =>
      ({
        ...c,
      } as Contact)
  );
  return contacts;
};
