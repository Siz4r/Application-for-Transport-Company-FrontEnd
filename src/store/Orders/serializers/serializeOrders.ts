import { Order, OrderResponse } from "../types";

export const serializeOrders = (apiOrders: OrderResponse[]): Order[] => {
  return apiOrders.map((o) => ({
    clientFirstName: o.clientUserFirstName,
    clientLastName: o.clientUserLastName,
    employeeFirstName: o.employeeUserFirstName,
    employeeLastName: o.employeeUserLastName,
    done: o.done,
    id: o.id,
    stuffName: o.stuffName,
    companyName: o.stuffCompanyName,
  }));
};
