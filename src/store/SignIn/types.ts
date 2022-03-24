export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  buildingNumber: number;
  postalCode: string;
  role: string;
}

export interface ApiUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  buildingNumber: number;
  postalCode: string;
}

export interface UpdateData {
  id: string;
  phoneNumber: string;
  city: string;
  postalCode: string;
  street: string;
  buildingNumber: number;
}

export interface ApiTokenResponse {
  accessToken: string;
  tokenType: string;
}

export interface ApiAuthenticationResponse extends ApiTokenResponse {
  user: ApiUser;
}

export interface ApiRegisterResponse {
  error: string;
  path: string;
  status: number;
  timestamp: string; // Datetime string
}
