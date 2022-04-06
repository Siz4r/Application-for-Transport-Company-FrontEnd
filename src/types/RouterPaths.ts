export enum AuthenticatedPaths {
  MY_PROFILE = "/my-profile/",
  EMPLOYEE = "/employee/",
  CLIENT = "/client/",
  ORDER = "/order/",
  COMPANY = "/company/",
  FILE = "/file/",
  CHAT = "/chat/",
}

export enum UnAuthenticatedPaths {
  SIGN_IN = "/sign-in",
  FORGOT_PASSWORD = "/forgot-password",
  RESTART_PASSWORD = "/restart-password/",
}

export const RouterPathsKeys = {
  ...AuthenticatedPaths,
  ...UnAuthenticatedPaths,
};

export type RouterPaths = AuthenticatedPaths | UnAuthenticatedPaths;
