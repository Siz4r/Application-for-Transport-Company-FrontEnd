export enum AuthenticatedPaths {
  MY_PROFILE = "/my-profile/",
  EMPLOYEES = "/employees/",
  EMPLOYEE = "/employee/",
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
