import { ApiUser, User } from "../types";

export const serializeUser = (apiUser: ApiUser, role: string): User => {
  const {
    id,
    firstName,
    lastName,
    phoneNumber,
    street,
    email,
    postalCode,
    buildingNumber,
    city,
  } = apiUser;
  return {
    id,
    firstName,
    lastName,
    phoneNumber,
    street,
    email,
    postalCode,
    buildingNumber,
    city,
    role,
  };
};
