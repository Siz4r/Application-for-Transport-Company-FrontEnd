import { Contact, ContactDto } from "../type";

export const serializeContacts = (apiEmployees: ContactDto[]): Contact[] => {
  const contacts: Contact[] = apiEmployees.map(
    (c) =>
      ({
        name: c.firstName + " " + c.lastName,
        id: c.id,
      } as Contact)
  );
  return contacts;
};
