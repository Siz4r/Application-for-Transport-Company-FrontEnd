import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  addClient,
  deleteClient,
  getClientById,
  getClients,
} from "../../../store/Clients/api";
import { Client, ClientGetById } from "../../../store/Clients/types";
import { RegisterData } from "../../../utils/types";
import { useTypedDispatch } from "../TypedDispatch/useTypedDispatch";

type UseProjectsConfig = {
  fetchOnMount?: boolean;
};

export const useClients = (
  config: UseProjectsConfig | undefined = undefined
) => {
  const typedDispatchGetClients = useTypedDispatch<
    typeof getClients,
    Client[]
  >();

  const typedDispatchGetClientById = useTypedDispatch<
    typeof getClientById,
    Required<ClientGetById>
  >();

  const typedDispatchDeleteClient = useTypedDispatch<
    typeof deleteClient,
    Required<ClientGetById>
  >();

  const typedDispatchAddClient = useTypedDispatch<typeof addClient, string>();

  const fetchOnMount = config && config.fetchOnMount === false ? false : true;
  const [clientsLoading, setclientsLoading] = useState(
    fetchOnMount ? true : false
  );

  const clients = useSelector<RootState>(({ clients }) => {
    return clients.clients;
  }) as Client[];

  const fetchClients = async (): Promise<Client[]> => {
    setclientsLoading(true);
    const { payload } = await typedDispatchGetClients(getClients());
    setclientsLoading(false);
    return payload;
  };

  const fetchClientById = async (
    id: string
  ): Promise<Required<ClientGetById>> => {
    setclientsLoading(true);
    const { payload } = await typedDispatchGetClientById(getClientById({ id }));
    setclientsLoading(false);
    return payload;
  };

  const removeClient = async (id: string) => {
    setclientsLoading(true);
    typedDispatchDeleteClient(deleteClient({ id }));
    setclientsLoading(false);
  };

  const registerClient = async (data: RegisterData) => {
    setclientsLoading(true);
    console.log("Elo");
    typedDispatchAddClient(addClient(data));
    setclientsLoading(false);
  };

  useEffect(() => {
    if (fetchOnMount) {
      try {
        fetchClients();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return {
    fetchClients,
    fetchClientById,
    removeClient,
    registerClient,
    clientsLoading,
    clients,
  };
};
