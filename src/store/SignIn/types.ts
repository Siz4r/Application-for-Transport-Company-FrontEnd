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
}

// export interface ApiUser {
//   id: string;
//   username: string;
//   email: string;
//   createdAt: string;
// }

export interface ApiTokenResponse {
  accessToken: string;
  tokenType: string;
}

export interface ApiAuthenticationResponse extends ApiTokenResponse {
  user: User;
}

export interface ApiRegisterResponse {
  error: string;
  path: string;
  status: number;
  timestamp: string; // Datetime string
}
