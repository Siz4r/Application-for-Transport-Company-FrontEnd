import { Client, ClientListResponse } from "../types";

export const serializeClients = (
  apiEmployees: ClientListResponse[]
): Client[] => {
  const employees: Client[] = apiEmployees.map(
    (e) =>
      ({
        firstName: e.userFirstName,
        lastName: e.userLastName,
        id: e.clientId,
      } as Client)
  );
  return employees;
};
