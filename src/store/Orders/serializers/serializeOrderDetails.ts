import dayjs from "dayjs";
import { OrderDetails, OrderDetailsResponse } from "../types";

export const serializeOrderDetails = (
  apiOrder: OrderDetailsResponse
): OrderDetails => {
  const { client, employee, stuff } = apiOrder;
  const company = apiOrder.stuff.company;
  return {
    id: apiOrder.id,
    company: {
      name: stuff.company.name,
      address: {
        street: company.street,
        city: company.city,
        postalCode: company.postalCode,
        buildingNumber: company.buildingNumber,
      },
    },
    employee: {
      id: employee.employeeId,
      firstName: employee.userFirstName,
      lastName: employee.userLastName,
      phoneNumber: employee.userPhoneNumber,
    },
    client: {
      firstName: client.userFirstName,
      lastName: client.userLastName,
      phoneNumber: client.userPhoneNumber,
      address: {
        street: client.userStreet,
        city: client.userCity,
        postalCode: client.userPostalCode,
        buildingNumber: client.userBuildingNumber,
      },
    },
    orderDate: dayjs(apiOrder.date).toDate(),
    stuffName: stuff.name,
    quantity: apiOrder.amount,
    done: apiOrder.done,
  };
};
